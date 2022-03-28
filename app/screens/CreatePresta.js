import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function CreatePresta(props) {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.inputContainer}>
                <Text>
                    Titre de votre prestation :
                </Text>
                <TextInput 
                defaultValue='Titre de votre prestation'
                // style={styles.loginText} 
                />
                <Text>
                    Description :
                </Text>
                <TextInput 
                defaultValue='description ...'
                // style={styles.description} 
                />
            </View>
            <View style={styles.imgContainer}>
                <Text>Choisir une image :</Text>
                {/* <Image style={styles.img} source={require("../../assets/favicon.png")}/> */}
                <TouchableOpacity style={styles.loginTouch}>
                    <Text style={styles.touchText}>
                        Charger votre image
                    </Text>
               </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.registerTouch} 
                    // onPress={() => navigation.navigate('Prestation')} 
                    >
                    <Text style={styles.touchText}>
                        Créer une Prestation
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
    img: {
        width: 200,
        height: 200,
    },
    imgContainer: {
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
    description: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 150,
        backgroundColor: colors.secondary,
        margin: 5,
        borderRadius: 5,
    },

    touchText: {
        color: colors.white,
    },
});

export default CreatePresta;