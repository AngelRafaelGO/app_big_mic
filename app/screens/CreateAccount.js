import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function CreateAccount(props) {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.formView}>
              <Text style={styles.textInfo}>
                  Nom
              </Text>
              <TextInput style={styles.inputText} />
              <Text style={styles.textInfo}>
                  Prenom
              </Text>
              <TextInput style={styles.inputText} />
              <Text style={styles.textInfo}>
                  Email
              </Text>
              <TextInput style={styles.inputText} />
              <Text style={styles.textInfo}>
                  Mot de passe
              </Text>
              <TextInput style={styles.inputText} />
              <Text style={styles.textInfo}>
                  Téléphone
              </Text>
              <TextInput style={styles.inputText} />
              <Text style={styles.textInfo}>
                  Ville
              </Text>
              <TextInput style={styles.inputText} />
                <TouchableOpacity 
                style={styles.createAccountTouchable} 
                onPress={() => navigation.navigate('Création de compte 2')}
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
        margin: 5,
        padding: 10,
    },
    textInfo: {
        marginTop: 8,
    },
});

export default CreateAccount;