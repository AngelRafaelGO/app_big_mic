import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";

import colors from '../../config/colors';
import { AuthContext } from '../../config/context';

function CreateAccount(props, {navigation, route }) {

    const { signUp } = React.useContext(AuthContext);

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [numphoto, setnumphoto] = useState(null); 
    // These variables should be deleted further on
    const psudo = 'sudo';
    const ville = 'paris';
    const tel = '1234';
    // const photo = 1;

    const insertData = (navigation) => {
        fetch('http://64.225.72.25:5000/addcompte', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({nom:nom, prenom:prenom, motdepasse:motDePasse, 
                ville:ville, tel:tel, pseudo:psudo, mail:email, numphoto:numphoto})
        })
        .then(resp => resp.json())
        .then(data => {
            signUp(motDePasse)
            //props.navigation.navigate('Profil')
        })
        .catch(error => console.log("POST error: " + error))
    }

    return (
        <SafeAreaView style={styles.background}>
            <Image 
            style={styles.creationImage}
            source={require('../../assets/pablita-523.png')}
            />
            <Text style={styles.creationTitle}>
                Création de compte
            </Text>
            <View style={styles.formView}>
                <TextInput 
                placeholder='Nom'
                style={styles.inputText} 
                onChangeText={text => setNom(text)}
                />
                <TextInput 
                placeholder='Prenom'
                style={styles.inputText} 
                onChangeText={text => setPrenom(text)}
                />
                <TextInput 
                placeholder='Email'
                style={styles.inputText} 
                onChangeText={text => setEmail(text)}
                />
                <TextInput 
                placeholder='Mot de passe'
                textContentType='password'
                secureTextEntry={true}
                style={styles.inputText} 
                onChangeText={(text) => setMotDePasse(text)}
                />
                <TouchableOpacity 
                style={styles.createAccountTouchable} 
                onPress={() => insertData()}
                >
                    <Text style={styles.nextScreenTouchable}>
                        Suivant
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    createAccountTouchable: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%' ,
        height: 40, 
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginTop: 40,
    },
    creationImage: {
        width: 200,
        height: 100,
        marginTop: 30,
    },
    creationTitle: {
        fontSize: 30,
        color: colors.primary,
        marginTop: 20,
    },
    nextScreenTouchable: {
        color: colors.white,
    },
    formView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    inputText: {
        backgroundColor: colors.light,
        width: '70%',
        height: 40,
        borderRadius: 5,
        marginTop: 25,
        padding: 10,
    },
    textInfo: {
        marginTop: 8,
    },
});

export default CreateAccount;