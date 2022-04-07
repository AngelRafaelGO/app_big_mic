import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, Linking} from 'react-native';
import { Button, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { blue400 } from 'react-native-paper/lib/typescript/styles/colors';
import colors from '../../config/colors';

function LieuDetails(props, {navigation}) {
    const data = props.route.params.data;

    const [materiel, setMateriel] = useState('');

    const confirmDeletion = () =>
    Alert.alert(
      "Supprimer un lieu",
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
        fetch(`http://188.166.40.140:5000/deletelieu/${data.numlieu}`, {
            method : 'DELETE',
        })
        .then(data => {
            props.navigation.navigate('Profil')
        })
        .catch(error => {
            console.log("DELETE error: " + error)
            alert
        })
    };

    const getmateriel = () => {
        fetch(`http://188.166.40.140:5000/getmateriel/${data.nummateriel}`, {
            method : 'GET'
        })
        .then(resp => resp.json())
        .then(materiel => {
          setMateriel(materiel)
          console.log(materiel)
        //   setLoading(false) 
        })
        .catch(error => console.log("ERROR caught:\n" + error))
    }

    useEffect(() =>{ 
        getmateriel();
      }, []);
    

  return (
    <View>
        <ScrollView>
            <View style = {styles.viewStyle}>
            <Text style= {styles.txtChamp}>
                        Titre:
                </Text>
                <Text style = {styles.txtTitre}>
                    {data.nomlieu}
                </Text>
                <TouchableOpacity 
                    style={styles.imgView} 
                    onPress={() => Alert.alert("go to full screen image \nnot implemented yet")}>
                    <Image source={{ uri: 'https://picsum.photos/700'}} style = {styles.img} />
                    {/* <Image source={{ uri : fichierphoto}} style = {styles.img} /> */}
                </TouchableOpacity>
                <Text style= {styles.txtChamp}>
                    Description
                </Text>
                <Text style = {styles.txtImportant}>
                    {data.desclieu}
                </Text>
                <Text style= {styles.txtChamp}>
                    Site WEB:
                </Text>
                <Text style={styles.txtlien}
                    onPress={() => Linking.openURL(data.lienlieu.toString())}>
                    {data.lienlieu}
                </Text>
                <Text style= {styles.txtChamp}>
                    Règles à suivre:
                </Text>
                <Text style = {styles.txtSecondaire}>
                    {data.contraintelieu}
                </Text>
                <Text style= {styles.txtChamp}>
                    Adresse:
                </Text>
                <Text style = {styles.txtSecondaire}>
                    {data.adrlieu}
                </Text>
                <Text style= {styles.txtChamp}>
                    Matériel:
                </Text>
                <Text style = {styles.txtSecondaire}>
                    {materiel.nommateriel}
                </Text>
                <Text style= {styles.txtChamp}>
                    Description du Matériel:
                </Text>
                <Text style = {styles.txtSecondaire}>
                    {materiel.descmateriel}
                </Text>
                <Text style = {styles.txtSecondaire}>
                    Ref: {data.numcompte} - {data.numlieu}
                </Text>
            </View>
        </ScrollView>
        <View  style = {styles.fabView}>
        <FAB
                small={true}
                icon="pencil"
                color='white'
                theme= {{colors:{accent:"rgb(255, 72, 88)"}}}
                onPress = {() => props.navigation.navigate("EditLieu", {data:data})}
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
    safeArea:{
        margin: 0,
        padding: 0,
    },
    viewStyle: {
         padding: 1,
         marginRight: 10,
         marginLeft: 15,
    },
    imgView: {
        alignItems: 'center',
        margin: 10,
        height: 200,
    },
    img: {
        height: 200,
        aspectRatio: 1,
        resizeMode: 'stretch',
    },
    txtTitre:{
        fontSize: 25,
    },
    txtImportant:{
        fontSize: 16, 
    },
    txtSecondaire:{
        fontSize: 14, 
    },
    txtlien:{
        textDecorationLine: 'underline',
        color: '#4d94d6',
    },
    txtChamp: {
        // width: 100,
        backgroundColor: colors.secondary,
        fontSize: 10,
        marginTop: 10,
    },
    fabView: {
        position: 'absolute',
        flexDirection: 'column',
        right: 10,
        top: 10,
      },
      fabBtn: {
        margin: 50,
        padding: 50,
      },
})

export default LieuDetails;