import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../config/colors';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import { utc } from 'moment';
import { IconButton } from 'react-native-paper';


const Button_filter_Date = (props) => {
  
  //Store selected date
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@selectedDate', value)
    } catch (e) {
      console.log("ASYNC Storage error: " + e);
    }
  }


  //Variables for calendar date picker
  const [selectedStartDate, setSelectedStartDate] = useState();

  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

  const minDate = new Date(); // Today
  const maxDate = new Date(minDate.getFullYear()+3, minDate.getMonth(), minDate.getDate());
  
  //Config dialog box handler
  const [visible, setVisible] = useState(false);
  

    const showCalendar = () => {
      setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
 

    const handleValidate = () => {
      // The user has pressed the "Delete" button, so here you can do your own logic.
      storeData(startDate);
      setVisible(false);
    };
    
    return (
      <View >
          <View>
            <Dialog.Container visible={visible} contentStyle={{height: 'auto', width: 'auto', padding:5}}>
              <Dialog.Title>Calendrier</Dialog.Title>
              <Dialog.Description >
              <View style={styles.dateContainer}>
                <CalendarPicker onDateChange={setSelectedStartDate}
                width={300}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor={colors.secondary}
                selectedDayColor={colors.primary}
                selectedDayTextColor={colors.black}
                scrollable={true}
                restrictMonthNavigation={true}
                />
                <Text>Vous avez sélectionné {startDate}</Text>
              </View>
              </Dialog.Description>
              <Dialog.Button label="Annuler" onPress={handleCancel} color={colors.primary}/>
              <Dialog.Button label="Valider" onPress={handleValidate} color={colors.primary}/>
            </Dialog.Container>
          </View>
        <TouchableOpacity
          style={{color: props.color, 
            borderRadius: props.border, 
            backgroundColor: props.background,
            padding: props.padding,
            }}
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
   dateContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      fontSize: 16,
    },
    filterList: {
      alignItems: 'center',
    },
})

export default Button_filter_Date;
