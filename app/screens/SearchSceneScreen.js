import React, {useState, useEffect} from 'react';
import {  View, StyleSheet, FlatList } from 'react-native';
import colors from '../config/colors';
import {Search_bar, Button_filter_Tag, Button_filter_Date} from './../components/componentsIndex'; 
import { Card, Badge } from 'react-native-paper';



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


//Action when user clicks on an item of the resulted search
const set_action = () => {
  Alert.alert('Aller vers la fiche selectionnée');
};

const set_filter = () => {
  Alert.alert('Selectionner les paramètres du filtre + rafraichir');
};




//Main component of this file
const SearchSceneScreen = ({navigation}) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 

  

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
    getScenesFromApi()
  }, []);

  //Research result item structure and filling
  const renderData = (item) => {
  const date = item.datescene.split('-');
  const month = date[1];
  const day = date[2];
  return (
  <Card
  style={styles.itemContainer}
  onPress={()=>navigation.navigate("Détails", {item: item})}>
    <Card.Title
      title={item.titrescene}
      subtitle={item.descscene}
      left={(props) => <Badge 
        size={50} 
        style= {styles.date}>{day}.{month}</Badge>}
      />
    </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Search_bar />
     
      <View style={styles.filterContainer}>
          
        <Button_filter_Date name="Date" />
        <Button_filter_Tag name="Tag"
        tagList={tagList}
        set_action= {set_filter} />
      </View>
      {/* Results of the research */}
      <FlatList
        style = {styles.listContainer}
        data = {data}
        renderItem = {({item}) => {
          // console.log(data)
          return renderData(item)
        }}
        onRefresh = {() => loadData()}
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
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: colors.primary, 
    color: colors.white,
  },
})

export default SearchSceneScreen;
