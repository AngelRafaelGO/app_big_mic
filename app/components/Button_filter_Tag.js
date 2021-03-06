import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../config/colors';
import Dialog from "react-native-dialog";
import SwitchFilter from './SwitchFilter';
import { Chip } from 'react-native-paper';



const Button_filter_Tag = (props) => {

  //Toogle Dialog box for filters
  const [visible, setVisible] = useState(false);

  const initialList = props.tagList;
  
  const buttonsListArr = initialList.map(buttonInfo => (
/*     <Chip style= {styles.filterList} key={buttonInfo.id} 
    onPress={() => console.log(buttonInfo.name + ' Pressed')}
    >{buttonInfo.name}</Chip> */

    <SwitchFilter 
    style={styles.filterList}
    key={buttonInfo.id}
    name={buttonInfo.name}
    />
    ));

  const showTags = () => {
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
      <Dialog.Container visible={visible} >
          <Dialog.Title>Tags</Dialog.Title>
          <Dialog.Description>
              {buttonsListArr}
          </Dialog.Description>
          <Dialog.Button label="Annuler" onPress={handleCancel} color={colors.primary}/>
          <Dialog.Button label="Valider" onPress={handleValidate} color={colors.primary}/>
          
        </Dialog.Container>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={showTags}
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
  
export default Button_filter_Tag;