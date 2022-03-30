import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";

import colors from "../../config/colors";

function Loading() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text>
                    Loading...
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
});

export default Loading;