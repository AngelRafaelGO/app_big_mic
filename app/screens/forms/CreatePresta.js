import React, { useState, useLayoutEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar, TouchableOpacity, RefreshControl} from 'react-native'; 
import {TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../config/colors';
// import ImagePicker from "react-native-image-picker";
//import {launchImageLibrary} from 'react-native-image-picker';


function CreatePresta(props, {navigation}) {

    const [numcompte, setnumcompte] = useState(null)
    const [titreprest, settitreprest] = useState("")
    const [descprest, setdescprest] = useState("")
    const [lienprest, setlienprest] = useState("")
    const [numphoto, setnumphoto] = useState(null)

    const [fichierphoto, setFichierphoto] = useState("")

    const [image, setImage] = useState("");
    
    const setBlob = async() => {
        let uriParts = fichierphoto.uri.split(".");
        let uriExtension = "image/" + uriParts[uriParts.length-1];
        console.log("file type: " + uriExtension);

        // var toto = document.querySelector(fichierphoto.uri);
        // var formdatas = new FormData(toto);

        const imgfile = await fetch(fichierphoto.uri);
        // const blob = new Blob(0, {type: uriExtension})
        // blob = await imgfile.blob();
        // blob = blob.slice(0,blob.size,"image/" + uriExtension);
        let formdata = new FormData;
        formdata.append('Image/' + uriExtension, imgfile);
        console.log("type : " + formdata.type);
        setImage(formdata);
        console.log(formdata);
    }

    const pickImage = async (props) => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        });
    
          console.log("ImagePicker returns: " + result.uri);
    
          if (!result.cancelled){
              setFichierphoto(result);
          } else {
              console.log('cancelled');
        }
      }

    const insertData = (navigation) => {
        console.log("image sélectionnée: " + fichierphoto.uri);
        if(fichierphoto.uri != ''){
            setBlob();
            console.log(fichierphoto.uri);
            console.log(image.size);
            fetch('http://64.225.72.25:5000/addphototest', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({fichierphoto: image})
            })
            .then(resp => resp.json())
            .then(data => {
                console.log('numero: ' + data.numphoto)
                // setnumphoto(data.numphoto)
                setnumphoto(null);
            })
            .catch(error => {
                console.log("Image couldn't be stored properly: " + error);
                setnumphoto(1);
            })
        } else Alert.Alert("Pas d'image sélectionnée");

        fetch('http://64.225.72.25:5000/addpresta', {
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
        <TextInput style = {styles.textInputStyle}
            label = "Compte"
            value = {numcompte}
            mode="outlined"
            onChangeText = {text => setnumcompte(text)}
        />
        <TouchableOpacity 
            style={styles.imgView} 
            onPress={() => pickImage()}>
                <Image source={{ uri : fichierphoto.uri}} style = {styles.img} />
                {/* <Image source={{ uri : fichierphoto.uri !== null ? image.url: '../../assets/No_Image_uploaded.png'}} style = {styles.img} /> */}
        </TouchableOpacity>

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