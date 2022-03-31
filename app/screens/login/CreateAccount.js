import React from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";

import colors from '../../config/colors';

function CreateAccount({ navigation }) {

    const [createPassword, setCreatePassword] = React.useState();

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
                />
                <TextInput 
                placeholder='Prenom'
                style={styles.inputText} 
                />
                <TextInput 
                placeholder='Email'
                style={styles.inputText} 
                />
                <TextInput 
                placeholder='Mot de passe'
                textContentType='password'
                secureTextEntry={true}
                style={styles.inputText} 
                onChangeText={(createPassword) => setCreatePassword(createPassword)}
                />
                <TouchableOpacity 
                style={styles.createAccountTouchable} 
                onPress={() => navigation.navigate('CreateAccount2', {
                    password: createPassword,
                })}
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