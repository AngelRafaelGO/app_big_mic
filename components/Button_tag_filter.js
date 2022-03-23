import React from 'react';
import {Button, View, StyleSheet, Alert} from 'react-native';
import colors from '../config/colors';

const Button_tag_filter = () => {

    const set_tag = () => {
    };
    
    return (
      <View style={styles.buttonContainer}>
        <Button style= {styles.button}
        title="Tag"
        onPress={()=> Alert.alert('tags à sélectionner + rafraichissement des résultats')}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
      buttonContainer: {
        backgroundColor: colors.secondary,
        color: colors.light,
        padding: 5,
        margin: 5,
        borderRadius: 15,
      },
      button: {
        width: 'auto',
        
      },
  })

export default Button_tag_filter;