import React, { useState , useEffect} from 'react';
import {Text, View, StyleSheet, AsyncStorageStatic } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';
import colors from '../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SelectDate = () => {

  //Store selected date
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@selectedDate', value)
    } catch (e) {
      console.log("ASYNC Storage error: " + e);
    }
  }

  const [selectedStartDate, setSelectedStartDate] = useState();
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

  const minDate = new Date(); // Today
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getFullYear()+3);
  
  useEffect(() =>{ 
    storeData(startDate)
  }), [];

  return (
    <View style={styles.container}>
      
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
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    }
});

export default SelectDate;