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
        width: 220,
        flexDirection: 'row',
        borderRadius: 15,
        flexBasis: 'auto',
        justifyContent:'space-between',
        marginBottom: 10,
        alignItems: 'center',
    },
    tag: {
      fontSize: 22,
      flexGrow: 1,
    },
})

export default SwitchFilter;