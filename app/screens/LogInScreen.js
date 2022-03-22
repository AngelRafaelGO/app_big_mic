import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function LoginScreen(props) {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.logoTitleContainer}>
                <Image style={styles.logo} source={require("../assets/microImage.jpg")}/>
                <Text>BIG MIC</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.loginText} />
                <TextInput style={styles.loginText} />
                <TouchableOpacity style={styles.loginTouch}>
                    <Text style={styles.touchText}>
                        Connexion
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerTouch}>
                    <Text style={styles.touchText}>
                        Créer une compte
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
    button: {
        fontSize: 5,
        color: colors.white,
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: 80,
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
        backgroundColor: colors.secondary_color,
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
        backgroundColor: colors.primary_color,
        margin: 5,
        borderRadius: 5,
    },
    registerTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        backgroundColor: colors.primary_color,
        margin: 5,
        borderRadius: 5,
    },
    touchText: {
        color: colors.white,
    },
});

export default LoginScreen;