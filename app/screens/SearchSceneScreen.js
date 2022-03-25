import React from 'react';
import { SafeAreaView, View, StyleSheet, VirtualizedList, Text, TouchableHighlight, Alert, Image } from 'react-native';
import colors from '../config/colors';
import {Button_filter_Tag, Button_filter_Date} from '../components/Button_filter';
import Search_bar from '../components/Search_bar';
import { AntDesign } from '@expo/vector-icons'; 
import { Card, Avatar } from 'react-native-paper';



const DATA = [];
const tagList = [
  {
    id: 1,
    name: "Musique"
  },
  {
    id: 2,
    name: "Danse"
  },
  {
    id: 3,
    name: "Chant"
  },
  {
    id: 4,
    name: "Théâtre"
  },
  {
    id: 5,
    name: "Stand-up"
  },
];

//Generation of the item's data
const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

//Generates unique key for each item
const _keyExtractor = (item, index) => item.id.toString();

const getItemCount = (data) => 30;

//Research result item structure and filling
const Item = ({ title }) => (
  //Remplacer avec une Card de Card paper ??
  <Card.Title
    style={styles.itemContainer}
    title={title}
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Image size={40} source={require('../assets/itemCat.png')} />}
    right={(props) => <AntDesign name="hearto" size={20} color={colors.primary} />
    }
  />
  /* 
  <TouchableHighlight 
  style={styles.itemContainer}
  onPress={()=> set_action()}
  >
    <View style={{width:'auto', flexDirection: 'row'}}>
      <Image
          style={styles.itemImage}
          source={require('../assets/itemCat.png')}
      />
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text>Description lorem</Text>
      </View>
    </View>
  </TouchableHighlight>*/

);

//Action when user clicks on an item of the resulted search
const set_action = () => {
  Alert.alert('Aller vers la fiche selectionnée');
};

const set_filter = () => {
  Alert.alert('Selectionner les paramètres du filtre + rafraichir');
};

const SearchSceneScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      <Search_bar />
     
      <View style={styles.filterContainer}>
          
        <Button_filter_Date name="Date" />
        <Button_filter_Tag name="Tag"
        tagList={tagList}
        set_action= {set_filter} />
      </View>
      {/* Results of the research */}
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={_keyExtractor}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.light,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    marginVertical:5,
    marginHorizontal: 20,
  },
  itemImage: {
    borderRadius: 25,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  shadowProp: {
    shadowColor: colors.dark,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})


export default SearchSceneScreen;
