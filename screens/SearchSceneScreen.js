import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Search_listview from '../components/Search_listview';
import Button_filter from '../components/Button_filter';
import Search_bar from '../components/Search_bar';
import colors from '../config/colors';

const SearchSceneScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Search_bar />
      <View style={styles.filterContainer}>  
        <Button_filter name="Date" />
        <Button_filter name="Tag" />
      </View>
      <Search_listview />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.white,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


export default SearchSceneScreen;
