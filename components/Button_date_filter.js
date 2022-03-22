import React from 'react';
import {Button, View, StyleSheet, Alert} from 'react-native';
import colors from '../app/config/colors.js';

const Button_date_filter = () => {

    const set_date = () => {

    };
    
    return (
      <View>
        <Button 
        title="Date"
        onPress={()=> Alert.alert('Date à régler + rafraichissement des résultats')}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
      button: {
        backgroundColor: colors.hard_pink
      }
  })

export default Button_date_filter;