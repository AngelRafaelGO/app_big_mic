import React from 'react';
import { SafeAreaView, View, StyleSheet, VirtualizedList, Text } from 'react-native';
import Button_filter from '../components/Button_filter';
import Search_bar from '../components/Search_bar';
import colors from '../config/colors';

const DATA = [];

//Generation of the item's data
const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

const getItemCount = (data) => 50;

//Research item structure and filling
const Item = ({ title }) => (

    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
    </View>

);

const SearchSceneScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Search_bar />
      <View style={styles.filterContainer}>  
        <Button_filter name="Date" />
        <Button_filter name="Tag" />
      </View>
      {/* Results of the research */}
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
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
  item: {
    padding: 10,
    backgroundColor: colors.white,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  shadowProp: {
    shadowColor: colors.dark,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})


export default SearchSceneScreen;
