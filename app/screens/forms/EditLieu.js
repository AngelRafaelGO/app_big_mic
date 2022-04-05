import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, Dimensions, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import colors from '../../config/colors';

//import { routeParams } from '../navigation/routesNavigator';

function EditLieu(props, {navigation}) {

    const data = props.route.params.data;

    const [numcompte, setnumcompte] = useState(data.numcompte);
    const [nomlieu, setnomlieu] = useState(data.nomlieu);
    const [desclieu, setdesclieu] = useState(data.desclieu);
    const [lienlieu, setlienlieu] = useState(data.lienlieu);
    const [contraintelieu, setcontraintelieu] = useState(data.contraintelieu);
    const [adrlieu, setadrlieu] = useState(data.adrlieu);
    const [nummateriel, setnummateriel] = useState(data.nummateriel);

    const [materiel, setMateriel] = useState('');
    const [nommateriel, setnommateriel] = useState('');
    const [descmateriel, setdescmateriel] = useState('');
    
    const getmateriel = () => {
        fetch(`http://64.225.72.25:5000/getmateriel/${data.nummateriel}`, {
            method : 'GET'
        })
        .then(resp => resp.json())
        .then(materiel => {
          setMateriel(materiel)
          setnommateriel(materiel.nommateriel);
          setdescmateriel(materiel.descmateriel);
          console.log(materiel)
        })
        .catch(error => console.log("ERROR caught:\n" + error))
    }

    useEffect(() =>{ 
        getmateriel();
      }, []);
    
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
            console.log("nouveau materiel ajouté: " + materiel.nummateriel);
            setnummateriel(materiel.nummateriel);
        })
        .catch(error => console.log("Materiel: POST error: " + error))
    }

    function modifMateriel(){
        fetch(`http://64.225.72.25:5000/updatemateriel/${data.nummateriel}`, {
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({nommateriel:nommateriel, descmateriel:descmateriel})
        })
        .then(resp => resp.json())
        .then(materiel => {
            console.log("materiel modifié: " + materiel.nommateriel);
        })
        .catch(error => console.log("Materiel: POST error: " + error))
    }

    const updateData = (navigation) => {
        if(nummateriel == null || nummateriel == 1){
            insertMateriel();
        } else {
           modifMateriel(); 
        }

        fetch(`http://64.225.72.25:5000/updatelieu/${data.numlieu}`, { 
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({numcompte:numcompte, nomlieu:nomlieu, desclieu:desclieu, lienlieu:lienlieu, contraintelieu:contraintelieu, adrlieu:adrlieu, nummateriel:nummateriel})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('LieuDetails', {data:data})
        })
        .catch(error => console.log("PUT error: " + error))
    }

  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
    <ScrollView>
        <TouchableOpacity 
            style={styles.imgView} 
            onPress={() => Alert.alert("you will be able to change the image here next time")}>
                <Image source={{ uri: 'https://picsum.photos/400'}} style = {styles.img} />
                {/* <Image source={{ uri : fichierphoto}} style = {styles.img} /> */}
        </TouchableOpacity>

        <View style = {styles.viewStyle}>
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
                minHeight= {80}
                // numberOfLines={10}
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
                multiline
                minHeight= {30}
                onChangeText = {text => setcontraintelieu(text)}
            />
            <TextInput style = {styles.textInputStyle}
                label = "Adresse"
                value = {adrlieu}
                mode="outlined"
                onChangeText = {text => setadrlieu(text)}
            />
            {/* <TextInput style = {styles.textInputStyle}
                label = "Materiel"
                keyboardType='numeric'
                value = {nummateriel}
                mode="outlined"
                onChangeText = {text => setnummateriel(parseInt(text))}
            /> */}
            <TextInput style = {styles.textInputStyle}
                label = "Dénomination matériel:"
                value = {nommateriel}
                mode="outlined"
                onChangeText = {text => setnommateriel(text)}
            />
            <TextInput style = {styles.textInputStyle}
                label = "Description matériel:"
                value = {descmateriel}
                mode="outlined"
                multiline
                minHeight= {30}
                onChangeText = {text => setdescmateriel(text)}
            />
            <TextInput style = {styles.textInputStyle}
                label = "Compte"
                keyboardType='numeric'
                value = {numcompte.toString()}
                mode="outlined"
                onChangeText = {text => setnumcompte(parseInt(text))}
            />
            <View style = {styles.btnView}>
                <Button style = {styles.btnStyle}
                    icon = "check"
                    mode='contained'
                    width= {150}
                    onPress={() => updateData(navigation)}>
                    Modifier
                </ Button>
            </View>
        </View>
    </ScrollView>
</SafeAreaView>
  )
};

const styles = StyleSheet.create ({
    safeAreaStyle: {
    },
    viewStyle: {
    },
    textInputStyle: {
        margin: 10,
    },
    btnView: {
        alignSelf: 'center',
    },
    btnStyle: {
        margin: 30,
        backgroundColor: '#FF4858'
    },
    imgView: {
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        backgroundColor: colors.secondary,
        width: Dimensions.get('window').width * 0.8,
        height: 300,
        borderRadius: 5,
    },
    img: {
        height: 260,
        aspectRatio: 1,
        resizeMode: 'stretch',
        // padding: 10,
        marginTop: 8,
    },

})

export default EditLieu;