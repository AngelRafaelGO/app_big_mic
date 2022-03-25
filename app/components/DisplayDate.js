import React, {useState} from 'react';
import { View } from 'react-native-web';
import colors from '../config/colors';

const DisplayDate = (props) => {
    return (
        <View styles={styles.container}>
            <Text styles={styles.month}>{props.month}</Text>
            <Text styles={styles.day}>{props.day}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
    },
    month: {
        backgroundColor: colors.primary,
    },
    day: {
        backgroundColor: colors.light,
    }

})

export default DisplayDate;