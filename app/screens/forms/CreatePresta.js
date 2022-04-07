import React, { useState, useLayoutEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar, Alert} from 'react-native'; 
import {TextInput, Button} from 'react-native-paper';
import { AuthContext } from '../../config/context';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../config/colors';

function CreatePresta(props, {navigation}) {

    const {getData} = React.useContext(AuthContext);
    const currentUsr = getData();
    const { numcompte } = currentUsr[0];
    const { pseudo } = currentUsr[0];

    // const [numcompte, setnumcompte] = useState(currentUsrNb);
    const [titreprest, settitreprest] = useState("")
    const [descprest, setdescprest] = useState("")
    const [lienprest, setlienprest] = useState("")
    const [numphoto, setnumphoto] = useState(null)

    const [fichierphoto, setfichierphoto] = useState("")

    const [image, setImage] = useState("");
    
    // const pickImage = async (props) => {
        
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     quality: 1,
    //     });
    
    //       console.log("ImagePicker returns: " + result.uri);
    
    //       if (!result.cancelled){
    //           setfichierphoto(result);
    //       } else {
    //           console.log('cancelled');
    //     }
    //   }

    const insertData = (navigation) => {
        console.log("image sélectionnée: " + fichierphoto);
        if(fichierphoto == ''){
            setfichierphoto('https://picsum.photos/400')
            Alert.alert("Pas d'image sélectionnée");
        }

        fetch('http://188.166.40.140:5000/addphoto', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
        },
            body: JSON.stringify({fichierphoto: fichierphoto})
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log('numero: ' + resp.numphoto)
            setnumphoto(resp.numphoto)
        })
        .catch(error => {
            console.log("Image URI couldn't be stored properly: " + error);
            setnumphoto(1);
        })

        console.log('numero enregistré: ' + numphoto)

        fetch('http://188.166.40.140:5000/addpresta', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({numcompte:numcompte, titreprest:titreprest, descprest:descprest, lienprest:lienprest, numphoto:numphoto})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Profil')
        })
        .catch(error => console.log("POST error: " + error))
    }

  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
    <ScrollView style = {styles.ScrollviewStyle}>
        <Text style = {styles.textInputStyle}>
            {numcompte} - {pseudo}
        </Text>
        <TextInput style = {styles.textInputStyle}
            label = "Titre"
            value = {titreprest}
            mode="outlined"
            onChangeText = {text => settitreprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Description"
            value = {descprest}
            mode="outlined"
            multiline
            numberOfLines={5}
            onChangeText = {text => setdescprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Lien"
            value = {lienprest}
            mode="outlined"
            onChangeText = {text => setlienprest(text)}
        />
        <View style={styles.imgView}>
            <Image source={{ uri : fichierphoto}} style = {styles.img} />
        </View>
        <TextInput style = {styles.textInputStyle}
            label = "Illustration de prestations (lien)"
            value = {fichierphoto}
            mode="outlined"
            onChangeText = {text => setfichierphoto(text)}
        />

        <View style = {styles.btnStyle} >
            <Button style = {styles.btnInside}
                icon = "pencil"
                mode='contained'
                onPress={() => insertData()}>
                Valider
            </ Button>
        </View>
    </ScrollView>
    </SafeAreaView>
  ); 
};

const styles = StyleSheet.create ({
    safeAreaStyle: {
        // flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    ScrollviewStyle: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // // marginTop: 30,
        // padding: 10,
        // width: '100%',
        // height: 500,
    },
    textInputStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        // width: '100%',
        // height: 40,
    },
    btnStyle: {
        margin: 30,
        // height: 60,
        // width: '100%'
        flexDirection:"row",
        justifyContent:"space-around",
        // margin: 10,
        // padding: 5,
    },
    btnInside: {
        backgroundColor: colors.primary,
    },
    imgView: {
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        backgroundColor: colors.secondary,
        height: 300,
        borderRadius: 5,
    },
    img: {
        // width: Dimensions.get('window').width * 0.8,
        height: 260,
        aspectRatio: 1,
        resizeMode: 'stretch',
        // padding: 10,
        marginTop: 8,
    },
});

export default CreatePresta;


{/* <ActivityIndicator style={style.View} color="#FF0000" size= "large" animating={true} /> */}