import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../config/colors';

const DisplayDate = (props) => {
    return (
        <View styles={styles.container}>
            <View styles={styles.month}>
                <Text >{props.month}</Text>
            </View>
            <View styles={styles.day}>
                <Text>{props.day}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.dark,
    },
    month: {
        backgroundColor: colors.primary,
    },
    day: {
        backgroundColor: colors.light,
    },
})

export default DisplayDate;