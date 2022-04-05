import React, {useState, useEffect} from 'react';
import {  View, StyleSheet, FlatList, Alert } from 'react-native';
import colors from '../config/colors';
import { Button_filter_Tag, Button_filter_Date} from './../components/componentsIndex'; 
import { Card, Badge, Searchbar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


/* const tagList = [
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
]; */



/* const set_filter = () => {
  Alert.alert('Selectionner les paramètres du filtre + rafraichir');
}; */


//Main component of this file
const SearchSceneScreen = ({navigation}) => {

  //Get selectedDate on Calendar picker
  const getSelectedDate = async () => {
    try {
      const value = await AsyncStorage.getItem('@selectedDate')
      if(value !== null) {
        setSelectedDate(value) ;
      }
    } catch(e) {
      console.log("ASYNC Reading Storage error: " + e);
    }
  }

  //Reset selectedDate of calendar
  const removeValue = async () => {
    try {
      await AsyncStorage.setItem('@selectedDate', "")
    } catch(e) {
      console.log("ASYNC Removal error: " + e);
    }
  }
  removeValue();

  const [selectedDate, setSelectedDate] = useState('');

  // Query to display the list of all scenes
  const getScenesFromApi = async () => {
    try {
      const response = await fetch('http://64.225.72.25:5000/getscene', {
        method: 'GET',
      });
      const scenes = await response.json();
      setFilteredDataSource(scenes);
      setMasterDataSource(scenes);
    } catch (error) {
      console.error("ERROR in query:" + error);
    }
  };

  useEffect(() =>{ 
    getScenesFromApi();
  }, []);

  //Research result item structure and filling
  const renderData = (item) => {
    var month = 'NR';
    var day = 'NR';
    if(item.datescene !== null){
      const date = item.datescene.split('-');
      month = date[1];
      day = date[2];
    }
  return (
  <Card
  style={styles.itemContainer}
  onPress={()=>navigation.navigate("Détails", {item: item})}>
    <Card.Title
      title={item.titrescene}
      subtitle={item.descscene}
      left={(props) => <Badge 
        size={50} 
        style= {styles.itemDate}
        >
          
        </Badge>}
      />
    </Card>
    );
  }
  //Search bar variables
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const searchtext = item.descscene + " " + item.titrescene + " " + item.criteres;
        const itemData = searchtext
          ? searchtext.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
      placeholder="Entrez votre recherche"
      onChangeText={(text) => searchFilterFunction(text)}
      value={search}
      iconColor={colors.primary}
      inputStyle={styles.searchinputStyle}
    />
     
      <View style={styles.filterContainer}>
          
        <Button_filter_Date name={"Date "+selectedDate} 
        />
        {/* <Button_filter_Tag name="Tag"
        tagList={tagList}
        set_action= {set_filter} /> */}
        <Button 
        icon= "filter"
        onPress={() => getSelectedDate()}
        color = {colors.primary}
        labelStyle={{color:colors.primary}}
        compact={true}
        > Appliquer </Button>
      </View>
      {/* Results of the research */}
      <FlatList
        style = {styles.listContainer}
        data = {filteredDataSource}
        renderItem = {({item}) => {
          // console.log(data)
          return renderData(item)
        }}
        keyExtractor = {item => `${item.numscene}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.white,
  },
  filterContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  listContainer: {
    backgroundColor: colors.light,
    paddingTop: 10,
  },
  itemContainer: {
    marginVertical:5,
    marginHorizontal: 20,
  },
  itemDate: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: colors.primary, 
    color: colors.white,
  },
  searchinputStyle: {
    margin: 5,
    backgroundColor: colors.light,
    borderRadius:5,
  },
})

export default SearchSceneScreen;