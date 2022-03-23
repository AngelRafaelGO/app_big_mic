import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View, SafeAreaView, TextInput, StyleSheet } from "react-native";

import colors from "../config/colors";

function CreateAccountS2() {

    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.formView}>
                <Text style={styles.textInfo}>
                    Choisiez un pseudo
                </Text>
                <TextInput style={styles.inputText} />
                <Text style={styles.textInfo}>
                    Choisiez une photo
                </Text>
                <TouchableOpacity style={styles.createAccountTouchable}>
                    <Text style={styles.createAccountTouchableTxt}>
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
        backgroundColor: colors.white,
    },
    createAccountTouchable: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%' ,
        height: 40, 
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginTop: 50,
    },
    createAccountTouchableTxt: {
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

export default CreateAccountS2;