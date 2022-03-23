import React from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, Text} from 'react-native';
import colors from '../app/config/colors';


const Button_filter = (props) => {

    const set_action = () => {
      Alert.alert('Selectionner les paramètres de '+props.name + ' + rafraichir');
    };
    
    return (
      <View >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={()=> props.set_action()}
          >
            <Text style={styles.button}>
            {props.name}
            </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
      buttonContainer: {
        backgroundColor: colors.secondary,
        color: colors.light,
        padding: 10,
        margin: 5,
        borderRadius: 18,
      },
      button: {
        width: 80,
        textAlign: 'center',
      },
  })

export default Button_filter;