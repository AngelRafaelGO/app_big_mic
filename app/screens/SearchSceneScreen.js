import React, {useState, useEffect} from 'react';
import {  View, StyleSheet, FlatList, Alert } from 'react-native';
import colors from '../config/colors';
import { Button_filter_Tag, Button_filter_Date} from './../components/componentsIndex'; 
import { Card, Badge, Searchbar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


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


const set_filter = () => {
  Alert.alert('Selectionner les paramètres du filtre + rafraichir');
};


//Main component of this file
const SearchSceneScreen = ({navigation}) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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


  const [selectedDate, setSelectedDate] = useState(getSelectedDate());
  console.log("Selected Date: " + selectedDate);


  // Query to display the list of all scenes
  const getScenesFromApi = async () => {
    try {
      const response = await fetch('http://64.225.72.25:5000/getscene', {
        method: 'GET',
      });
      const scenes = await response.json();
      setData(scenes),
      setLoading(false);
    } catch (error) {
      console.error("ERROR in query:" + error);
    }
  };

  useEffect(() =>{ 
    getScenesFromApi();
  }, []);

  //Research result item structure and filling
  const renderData = (item) => {
    var month = '00';
    var day = '00';
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
        style= {styles.itemDate}>{day}.{month}</Badge>}
      />
    </Card>
    );
  }
  //Search bar variables
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
     
      <View style={styles.filterContainer}>
          
        <Button_filter_Date name="Date" />
        <Button_filter_Tag name="Tag"
        tagList={tagList}
        set_action= {set_filter} />
        <Button 
        icon= "filter"
        mode="contained" 
        onPress={() => getSelectedDate()}
        > Appliquer </Button>
      </View>
      {/* Results of the research */}
      <FlatList
        style = {styles.listContainer}
        data = {data}
        renderItem = {({item}) => {
          // console.log(data)
          return renderData(item)
        }}
        onRefresh = {() => getScenesFromApi()}
        refreshing = {loading}
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
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: colors.primary, 
    color: colors.white,
  },
})

export default SearchSceneScreen;