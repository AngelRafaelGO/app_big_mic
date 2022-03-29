import React, { useState } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';
import colors from '../config/colors';



const SelectDate = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

  const minDate = new Date(); // Today
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getFullYear()+3);

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
      <Text>Rechercher jusqu'au {startDate}</Text>
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