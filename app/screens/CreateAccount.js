import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function CreateAccount(props) {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.formView}>
              <Text>
                  Nom
              </Text>
              <TextInput style={styles.inputText}>

              </TextInput>
              <Text>
                  Prenom
              </Text>
              <TextInput style={styles.inputText}>

              </TextInput>
              <Text>
                  Pseudo
              </Text>
              <TextInput style={styles.inputText}>

              </TextInput>
              <Text>
                  email
              </Text>
              <TextInput style={styles.inputText}>

              </TextInput>
              <Text>
                  Mot de passe
              </Text>
              <TextInput style={styles.inputText}>

              </TextInput>
                <TouchableOpacity style={styles.createAccountTouchable}>
                    <Text style={styles.createAccountTouchableText}>
                        Créer mon compte
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
    createAccountTouchableText: {
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
        backgroundColor: colors.secondary,
        width: '70%',
        height: 40,
        borderRadius: 5,
        margin: 5,
        padding: 10,
    },
});

export default CreateAccount;