import React, {useState} from 'react';
import {Text, View, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectDate = () => {

    onDateChange = (date, type) => {
        if (type === 'END_DATE') {
          useState({
            selectedEndDate: date,
          });
        } else {
          useState({
            selectedStartDate: date,
            selectedEndDate: null,
          });
        }
      }

    const { selectedStartDate, selectedEndDate } = useState;
    const minDate = new Date(); // Today
    const maxDate = new Date(2017, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    return(
        <SafeAreaView style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED START DATE:{ startDate }</Text>
          <Text>SELECTED END DATE:{ endDate }</Text>
        </View>
      </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    }
})

export default SelectDate;
