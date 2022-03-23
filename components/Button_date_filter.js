import React from 'react';
import {Button, View, StyleSheet, Alert} from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import colors from '../config/colors';

const Button_date_filter = () => {

    const set_date = () => {
    };
    
    return (
      <View style={styles.buttonContainer}>
        <Button
        title="Date"
        onPress={()=> Alert.alert('Date à régler + rafraichissement des résultats')}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
      buttonContainer: {
        backgroundColor: colors.secondary,
        color: colors.light,
        padding: 5,
        padding: 5,
        margin: 5,
        borderRadius: 15,
      },
      button: {
        width: 'auto',
      },
  })

export default Button_date_filter;