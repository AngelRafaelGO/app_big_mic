import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function LoginScreen(props) {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.logoTitleContainer}>
                <Image style={styles.logo} source={require("../assets/microImage.jpg")}/>
                <Text>BIG MIC</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                textContentType='emailAddress'
                keyboardType='email-address' 
                style={styles.loginText} 
                />
                <TextInput 
                textContentType='password'
                secureTextEntry={true}
                style={styles.loginText} 
                />
                <TouchableOpacity style={styles.loginTouch}>
                    <Text style={styles.touchText}>
                        Connexion
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerTouch} onPress={() => navigation.navigate('Création de compte')} >
                    <Text style={styles.touchText}>
                        Créer une compte
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
        backgroundColor: colors.secondary,
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