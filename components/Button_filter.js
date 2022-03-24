import React from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, Text} from 'react-native';
import colors from '../app/config/colors';
import SelectDate from './SelectDate';
import Dialog from "react-native-dialog";
import { SafeAreaView } from 'react-native-safe-area-context';


export const Button_filter_Tag = (props) => {

    const set_action_tag = () => {
      const visibility = false;
        <SafeAreaView>
            <Dialog.Container visible={visibility}>
            <Dialog.Title>"Calendrier"</Dialog.Title>
            <Dialog.Description>
            Choisissez la période
            </Dialog.Description>
            <SelectDate />
            <Dialog.Button label="Annuler" onPress={visibility = false}/>
            <Dialog.Button label="Valider" onPress={visibility = false}/>
            </Dialog.Container>
        </SafeAreaView>
    };

    
    return (
      <View >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={()=> set_action_tag()}
          >
            <Text style={styles.button}>
            {props.name}
            </Text>
        </TouchableOpacity>
      </View>
    );
  };

  export const Button_filter_Date = (props) => {

    const set_action_date = () => {
      Alert.alert(
        "Choisissez la période",
        <SelectDate />,
        [
          {text: "Valider",
        onPress: () => console.log('Période enregistrée')}
        ]
      );
    };
    
    
    return (
      <View >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={()=> set_action_date()}
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
  
