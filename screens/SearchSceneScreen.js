import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import Search_listview from '../components/Search_listview';
import Button_date_filter from '../components/Button_date_filter';
import Search_bar from '../components/Search_bar';

const SearchSceneScreen = () => {
  return (
    <SafeAreaView>
      <Search_bar />
      <Button_date_filter />
      <Search_listview />
    </SafeAreaView>
  );
}




export default SearchSceneScreen;
