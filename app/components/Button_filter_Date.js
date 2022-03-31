import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../config/colors';
import SelectDate from './SelectDate';
import Dialog from "react-native-dialog";


const Button_filter_Date = (props) => {
    const [visible, setVisible] = useState(false);

    const showCalendar = () => {
      setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    const handleValidate = () => {
      // The user has pressed the "Delete" button, so here you can do your own logic.
      // ...Your logic
      setVisible(false);
    };
    
    return (
      <View >
          <View>
            <Dialog.Container visible={visible} contentStyle={{height: 'auto', width: 'auto', padding:5}}>
              <Dialog.Title>Calendrier</Dialog.Title>
              <Dialog.Description >
                <SelectDate />
              </Dialog.Description>
              <Dialog.Button label="Annuler" onPress={handleCancel} color={colors.primary}/>
              <Dialog.Button label="Valider" onPress={handleValidate} color={colors.primary}/>
            </Dialog.Container>
          </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={showCalendar}
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
    filterList: {
      alignItems: 'center',
    },
})

export default Button_filter_Date;
