import React from 'react'
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../config/colors'
import { AuthContext } from '../config/context';

function ProfilOptions({ navigation }) {

    const { signOut } = React.useContext(AuthContext);

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.disconnectTouch}>
                <TouchableOpacity
                onPress={() => navigation.navigate('EditProfil')}
                >
                    <Text style={styles.disconnectTouchTxt}>
                        Editer mon profil
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.disconnectTouch}>
                <TouchableOpacity
                onPress={() => signOut()}
                >
                    <Text style={styles.disconnectTouchTxt}>
                        Disconnect
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
    disconnectTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        backgroundColor: colors.primary,
        margin: 5,
        borderRadius: 5,
    },
    disconnectTouchTxt: {
        color: colors.white,
    },
});

export default ProfilOptions;