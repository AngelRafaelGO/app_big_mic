import React, { useState } from 'react'
import {View, StyleSheet, SafeAreaView, Dimensions, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import colors from '../config/colors';

function EditProfil(props, {navigation}) {

    const data = props.route.params.data;

    const [userData, setUserData] = useState([]);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [numphoto, setnumphoto] = useState(null); 
    const psudo = 'sudo';
    const ville = 'paris';
    const tel = '1234';
   
    const updateData = (navigation) => {
        setnumphoto('1');
        fetch(`http://64.225.72.25:5000/updatepresta/${email}`, { 
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({numcompte:numcompte, titreprest:titreprest, descprest:descprest, lienprest:lienprest, numphoto:numphoto})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('PrestaDetails', {data:data})
        })
        .catch(error => console.log("PUT error: " + error))
    }

  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
        <ScrollView>
            <View>
                <TextInput style = {styles.textInputStyle}
                    label = "Titre:"
                    mode="outlined"
                />
                <TextInput style = {styles.textInputStyle}
                    label = "Description:"
                    mode="outlined"
                    multiline
                    minHeight = {80}
                />
                <TextInput style = {styles.textInputStyle}
                    label = "Site WEB:"
                    mode="outlined"
                />
                <TextInput style = {styles.textInputStyle}
                    label = "Compte:"
                    keyboardType='numeric'
                    mode="outlined"
                />
                <View style = {styles.viewStyle}>
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
        marginLeft: 10,
        marginRight: 10,
        
    },
    viewStyle: {
        alignSelf: 'center',
    },
    textInputStyle: {
        fontSize: 15,
        margin: 3,
    },
    btnStyle: {
        margin: 30,
        backgroundColor: '#FF4858'
    },
    imgView: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        // borderWidth: 1,
        backgroundColor: colors.secondary,
        width: Dimensions.get('window').width * 0.92,
        height: 300,
        borderRadius: 4,
    },
    img: {
        height: 260,
        aspectRatio: 1,
        resizeMode: 'stretch',
        // padding: 10,
        marginTop: 8,
    },

})

export default EditProfil;