import React, { useState } from 'react'
import {View, StyleSheet, Dimensions, SafeAreaView, ScrollView, Text } from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import { AuthContext } from '../config/context';
import colors from '../config/colors';

function EditProfil() {
    const { getData, signOut } = React.useContext(AuthContext);
    const accountData = getData();
    const { mail, motdepasse, nom, prenom, numcompte, ville } = accountData[0];
    
    const [email, setEmail] = useState(mail);
    const [password, setPassword] = useState(motdepasse);
    const [lName, setLName] = useState(nom);
    const [name, setName] = useState(prenom);
    const [city, setCity] = useState(ville);
    const [username, setUsername] = useState('');
    const [numphoto, setnumphoto] = useState('1'); 
    const tel = '1234';
   
    const updateUserAccount = () => {
        fetch(`http://64.225.72.25:5000/updatecompte/${numcompte}`, { 
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({numcompte:numcompte, nom:lName, prenom:name, motdepasse:password, 
                ville:city, tel:tel, pseudo:username, mail:email, numphoto:numphoto})
        })
        .then(resp => resp.json())
        .then(() => {
            signOut();
            //navigation.navigate('Profil');
        })
        .catch(error => console.log("PUT error: " + error))
    }

  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
        <ScrollView>
            <View>
                <TextInput style = {styles.textInputStyle}
                    label = {mail}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput style = {styles.textInputStyle}
                    label = "Mot de passe"
                    mode="outlined"
                    onChangeText={text => setPassword(text)}
                />
                <TextInput style = {styles.textInputStyle}
                    label = {nom}
                    mode="outlined"
                    onChangeText={text => setLName(text)}
                />
                <TextInput style = {styles.textInputStyle}
                    label = {prenom}
                    mode="outlined"
                    onChangeText={text => setName(text)}
                />
                <TextInput style = {styles.textInputStyle}
                    label = "pseudo"
                    mode="outlined"
                    onChangeText={text => setUsername(text)}
                />
                <TextInput style = {styles.textInputStyle}
                    label = {city}
                    mode="outlined"
                    onChangeText={text => setCity(text)}
                />
                <Text style={styles.txtwarning}>
                    Après la modification, vous devrez vous conecter à nouveau
                </Text>
                <View style = {styles.viewStyle}>
                    <Button style = {styles.btnStyle}
                        icon = "check"
                        mode='contained'
                        width= {150}
                        onPress={() => {
                            updateUserAccount()
                        }}>
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
    txtwarning: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,

    },

})

export default EditProfil;