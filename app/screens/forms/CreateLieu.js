import React, { useState, useLayoutEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar, TouchableOpacity, RefreshControl} from 'react-native'; 
import {TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../config/colors';
// import ImagePicker from "react-native-image-picker";
//import {launchImageLibrary} from 'react-native-image-picker';


function CreateLieu(props, {navigation}) {

    const [numcompte, setnumcompte] = useState(null);
    const [nomlieu, setnomlieu] = useState("");
    const [desclieu, setdesclieu] = useState("");
    const [lienlieu, setlienlieu] = useState("");
    const [contraintelieu, setcontraintelieu] = useState(null);
    const [adrlieu, setadrlieu] = useState(null);
    const [nummateriel, setnummateriel] = useState(null);


    const [nommateriel, setnommateriel] = useState(null);
    const [descmateriel, setdescmateriel] = useState(null);

    const[fichierphoto, setFichierphoto] = useState(""); 

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

      function insertMateriel(){
        fetch('http://64.225.72.25:5000/addmateriel', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({nommateriel:nommateriel, descmateriel:descmateriel})
        })
        .then(resp => resp.json())
        .then(materiel => {
            console.log("nouveau materiel ajouté" + materiel);
            setnummateriel(materiel.nummateriel.toString());
        })
        .catch(error => console.log("Materiel: POST error: " + error))
    }

    const insertData = (navigation) => {
        if(nommateriel !=""){
            insertMateriel();
            console.log(nummateriel+" - "+ nommateriel);
        } else {
            setnummateriel('');
        }
        fetch('http://64.225.72.25:5000/addlieu', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({numcompte:numcompte, nomlieu:nomlieu, desclieu:desclieu, lienlieu:lienlieu, contraintelieu:contraintelieu, adrlieu:adrlieu, nummateriel:nummateriel})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Profil')
        })
        .catch(error => console.log("POST error: " + error))
    }

  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
    <ScrollView>
        <TextInput style = {styles.textInputStyle}
            label = "Nom"
            value = {nomlieu}
            mode="outlined"
            onChangeText = {text => setnomlieu(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Description"
            value = {desclieu}
            mode="outlined"
            multiline
            numberOfLines={5}
            onChangeText = {text => setdesclieu(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Lien"
            value = {lienlieu}
            mode="outlined"
            onChangeText = {text => setlienlieu(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Contraintes"
            value = {contraintelieu}
            mode="outlined"
            onChangeText = {text => setcontraintelieu(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Adresse"
            value = {adrlieu}
            mode="outlined"
            onChangeText = {text => setadrlieu(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Compte"
            value = {numcompte}
            mode="outlined"
            onChangeText = {text => setnumcompte(text)}
        />
        {/* <TextInput style = {styles.textInputStyle}
            label = "Materiel"
            value = {nummateriel}
            mode="outlined"
            onChangeText = {text => setnummateriel(text)}
        /> */}
        <TextInput style = {styles.textInputStyle}
            label = "Dénomination matériel"
            value = {nommateriel}
            mode="outlined"
            onChangeText = {text => setnommateriel(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Description matériel"
            value = {descmateriel}
            mode="outlined"
            onChangeText = {text => setdescmateriel(text)}
        />
        
        <TouchableOpacity 
            style={styles.imgView} 
            onPress={() => pickImage()}>
                <Image source={{ uri : fichierphoto.uri}} style = {styles.img} />
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
        paddingTop: StatusBar.currentHeight,
    },
    textInputStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
    },
    btnStyle: {
        margin: 30,
        flexDirection:"row",
        justifyContent:"space-around",
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
        height: 260,
        aspectRatio: 1,
        resizeMode: 'stretch',
        marginTop: 8,
    },
});

export default CreateLieu;


{/* <ActivityIndicator style={style.View} color="#FF0000" size= "large" animating={true} /> */}