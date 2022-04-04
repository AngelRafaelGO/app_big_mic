import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import colors from '../../config/colors';
import { Roboto_700Bold_Italic, useFonts } from '@expo-google-fonts/roboto';

function WelcomeScreen() {
    const navigation = useNavigation();
    const [fontsLoaded, error] = useFonts({
        Roboto_700Bold_Italic,
    });

    if (!fontsLoaded) {
        return error;
    };

    return(
        <SafeAreaView style={styles.background}>
            <View style={styles.welcomeContent}>
                <Swiper
                loop
                autoplay
                autoplayTimeout={5}
                dot={
                    <View style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginTop: 5,
                        margin: 5,
                        backgroundColor: colors.dark,
                    }}></View>
                }
                activeDot={
                    <View style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginTop: 5,
                        margin: 5,
                        backgroundColor: colors.primary,
                    }}></View>
                }
                >
                    <Image 
                    source={require('../../assets/slidesLogin/slideWelcome.jpg')}
                    resizeMode='center'
                    style={styles.slideImage}
                    />
                    <Image 
                    source={require('../../assets/slidesLogin/slideArtiste.jpg')}
                    resizeMode='center'
                    style={styles.slideImage}
                    />
                    <Image 
                    source={require('../../assets/slidesLogin/slideOrga.jpg')}
                    resizeMode='center'
                    style={styles.slideImage}
                    />
                    <Image 
                    source={require('../../assets/slidesLogin/slideFin.jpg')}
                    resizeMode='center'
                    style={styles.slideImage}
                    />
                </Swiper>
            </View>
            <View style={styles.touchableView}>
                <TouchableOpacity 
                style={styles.opTouch}
                onPress={() => navigation.navigate('CreateAccoun1')}
                >
                    <Text style={styles.startTxt}>
                        Commencer
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.loginTouch}
                onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginTxt}>
                        J'ai déjà un compte
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    footerTextFont: {
        fontSize: 9,
        color: colors.dark,
    },
    loginTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 40, 
        marginBottom: 130,
    },  
    loginTxt: {
        fontSize: 11,
        color: colors.dark,
    },
    welcomeContent: {
        flex: 1,
        alignItems: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    opTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 40, 
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    slideImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 50,
    },
    startTxt: {
        color: colors.white,
    },
    touchableView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WelcomeScreen;