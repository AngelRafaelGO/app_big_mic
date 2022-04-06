import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';

import { AuthContext } from '../../config/context';
import colors from '../../config/colors';

function LoginScreen({navigation}) {

    const { signIn } = React.useContext(AuthContext);
    const [password, setPassword] = React.useState();
    const [mail, setMail] = useState('');
    let userData = [];

    const getMail = (mail) => {
        fetch(`http://64.225.72.25:5000/getmail/${mail}`, {
            method : 'GET',
        }) 
        .then(resp => resp.json())
        .then(userObject => {
            const { motdepasse } = userObject[0]
                if (motdepasse != password) {
                    Alert.alert(
                        "Mot de passe ou email incorrects",
                        "Veuillez réessayer",
                        [
                            {
                                text: "Cancel",
                                style: "cancel",
                            },
                            { 
                                text: "OK",
                            },
                        ]
                    );
                } else {
                    userData = userObject;
                    signIn(password, userData);
                }    
            })
        .catch(error => console.log("ERROR caught:\n" + error))
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.logoTitleContainer}>
                <Image style={styles.logo} source={require("../../assets/microImage.jpg")}/>
                <Text style={styles.loginTitle}>BIG MIC</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                placeholder='Email'
                textContentType='emailAddress'
                keyboardType='email-address' 
                style={styles.loginText} 
                onChangeText={(text) => setMail(text)}
                />
                <TextInput 
                placeholder='Mot de pass'
                textContentType='password'
                secureTextEntry={true}
                style={styles.loginText} 
                onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity 
                style={styles.loginTouch}
                onPress={() => getMail(mail)}
                >
                    <Text style={styles.touchText}>
                        Connexion
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerText}>
                <Text style={styles.footerTextFont}>
                    Big Mic &#127897;
                </Text>
                <Text style={styles.footerTextFont}>
                    Coding Factory Paris
                </Text>
                <Text style={styles.footerTextFont}>
                &copy; 2022
                </Text>
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
    footerText: {
        alignItems: 'center',
    },
    footerTextFont: {
        fontSize: 12,
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: 80,
    },
    loginTitle: {
        fontSize: 30,
        color: colors.primary,
    },
    logo: {
        width: 125,
        height: 125,
    },
    logoTitleContainer: {
        fontSize: 18,
        alignItems: 'center',
        position: 'absolute',
        top: 70,
    },
    loginText: {
        backgroundColor: colors.light,
        width: '70%',
        height: 40,
        borderRadius: 5,
        margin: 5,
        padding: 10,
    },
    loginTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%' ,
        height: 40, 
        backgroundColor: colors.primary,
        margin: 5,
        borderRadius: 5,
    },
    registerTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        backgroundColor: colors.primary,
        margin: 5,
        borderRadius: 5,
    },
    touchText: {
        color: colors.white,
    },
});

export default LoginScreen;