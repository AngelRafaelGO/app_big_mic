import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Search_listview from '../components/Search_listview';
import Button_date_filter from '../components/Button_date_filter';
import Button_tag_filter from '../components/Button_tag_filter';
import Search_bar from '../components/Search_bar';

const SearchSceneScreen = () => {
  return (
    <SafeAreaView>
      <Search_bar />
      <View style={styles.filterContainer}>  
        <Button_date_filter />
        <Button_tag_filter />
      </View>
      <Search_listview />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


export default SearchSceneScreen;
