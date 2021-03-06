import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Linking} from 'react-native';
import { Button, FAB} from 'react-native-paper';
import { AuthContext } from '../../config/context';
import colors from '../../config/colors';

function PrestaDetails(props, {navigation}) {
    const data = props.route.params.data;

    const {getData} = React.useContext(AuthContext);
    const currentUsr = getData();
    const { numcompte } = currentUsr[0];
    const { pseudo } = currentUsr[0]

    const [fichierphoto, setFichierphoto] = useState('');

    const [img, setImg] = useState();

    const fetchImage = async () => {
        try{
            const res = await fetch(fichierphoto.fichierphoto);
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
        } catch (e){
            console.log("Error in fetImage function" + e);
        }
    };

    const confirmDeletion = () =>
    Alert.alert(
      "Supprimer une prestation",
      "confirmer la suppression",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteData(data) }
      ]
    );

    const deleteData =  (data) => {
        fetch(`http://188.166.40.140:5000/deletepresta/${data.numprest}`, {
            method : 'DELETE',
        })
        .then(data => {
            props.navigation.navigate('Profil')
        })
        .catch(error => {
            console.log("DELETE error: " + error)
            Alert.alert("la Prestation n'a pas pu être supprimée")
        })
    };

    const getphoto = () => {
        console.log('numphoto:' + data.numphoto)
        fetch(`http://188.166.40.140:5000/getphoto/${data.numphoto}`, {
            method : 'GET',
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.numphoto != null || resp.fichierphoto !='' || resp.fichierphoto != 'undefined'){
                console.log("il y a une photo " + resp.numphoto + " - "+ resp.fichierphoto);
                setFichierphoto(resp);
            }
        })
        .catch(error => {
            console.log("photo upload error: " + error);
            Alert.alert('pas de photo');
        })
    };

    useEffect(() =>{ 
        getphoto();
        if (fichierphoto.fichierphoto == ''){
            fichierphoto.fichierphoto = 'https://picsum.photos/700';
            console.log("fichier: " + fichierphoto.fichierphoto);
        }
        fetchImage();
      }, []);


  return (
      <View>
        <ScrollView>
            <View style = {styles.viewStyle}>
                <Text style= {styles.txtChamp}>
                        Titre:
                </Text>
                <Text style = {styles.txtTitre}>
                    {data.titreprest}
                </Text>
                <TouchableOpacity 
                    style={styles.imgView} 
                    onPress={() => Alert.alert("go to full screen image")}>
                    <Image source={{ uri: fichierphoto.fichierphoto}} style = {styles.img} />
                    {/* <Image source={{ uri: 'https://picsum.photos/700'}} style = {styles.img} /> */}
                </TouchableOpacity>
                <Text style= {styles.txtChamp}>
                    {data.numphoto} - {fichierphoto.fichierphoto}
                </Text>
                <Text style= {styles.txtChamp}>
                    Description:
                </Text>
                <Text style = {styles.txtImportant}>
                    {data.descprest}
                </Text>
                <Text style= {styles.txtChamp}>
                    Site WEB:
                </Text>
                <Text style={styles.txtlien}
                    onPress={() => Linking.openURL(data.lienprest.toString())}>
                    {data.lienprest}
                </Text>
                <Text style = {styles.txtSecondaire}>
                    Ref: {data.numcompte} - {data.numprest} - {pseudo}
                </Text>
            </View>
        </ScrollView>
        <View  style = {styles.fabView}>
            <FAB
                small={true}
                icon="pencil"
                color='white'
                theme= {{colors:{accent:"rgb(255, 72, 88)"}}}
                onPress = {() => props.navigation.navigate("EditPresta", {data:data})}
            />
            <Text>
                
            </Text>
            <FAB
                small={true}
                icon="delete"
                color='white'
                theme= {{colors:{accent:"rgb(255, 72, 88)"}}}
                onPress = {() => confirmDeletion()}
            />
        </View>
    </View>
  )
};

const styles = StyleSheet.create ({
    viewStyle: {
         padding: 1,
         marginRight: 10,
         marginLeft: 15,
    },
    imgView: {
        alignItems: 'center',
        margin: 10,
        height: 200,
        width: 300,
    },
    img: {
        height: 200,
        aspectRatio: 1.5,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    fabView: {
        position: 'absolute',
        flexDirection: 'column',
        right: 10,
        top: 10
      },
    txtTitre:{
        fontSize: 25,
    },
    txtImportant:{
        fontSize: 16, 
        marginTop: 15,
    },
    txtSecondaire:{
        fontSize: 12, 
        marginTop: 12,
    },
    txtlien:{
        textDecorationLine: 'underline',
        color: '#4d94d6',
    },
    txtChamp: {
        backgroundColor: colors.secondary,
        fontSize: 10,
        marginTop: 10,
    },
})

export default PrestaDetails