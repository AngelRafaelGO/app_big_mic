import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import colors from '../app/config/colors';



const SwitchFilter = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    return (
        <View style={styles.containerTag} >
            <Text style={styles.tag} >
            {props.name}
            </Text>
            <Switch
            trackColor={{ false: colors.secondary, true: colors.primary }}
            thumbColor={isEnabled ? colors.secondary : colors.white}
            ios_backgroundColor={colors.dark}
            onValueChange={toggleSwitch}
            value={isEnabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerTag: {
        flexDirection: 'row',
        borderRadius: 15,
        width: 'auto',
        justifyContent:'space-around',
        marginBottom:5,
    },
    tag: {
      fontSize: 22,
      width:'50%',
    },
})

export default SwitchFilter;