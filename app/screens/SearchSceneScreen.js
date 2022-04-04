import React, {useState, useEffect} from 'react';
import {  View, StyleSheet, FlatList, Alert, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';
import { Button_filter_Date} from './../components/componentsIndex'; 
import { Card, Badge, Searchbar, Button, Provider, Divider , Menu} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    console.log('Done.')
  }
  removeValue();

  const [loading, setLoading] = useState(true); 
  const [selectedDate, setSelectedDate] = useState('');
  console.log("Selected Date: " + selectedDate);

  //Query to apply date filter
  const getScenesDateFilteredScenes = async () => {
    try {
      const response = await fetch(`http://64.225.72.25:5000/scenedatelessthan/${selectedDate}`, {
        method: 'GET',
      });
      const scenes = await response.json();
      setFilteredDataSource(scenes);
      setMasterDataSource(scenes);
      setLoading(false)
    } catch (error) {
      console.error("ERROR in query:" + error);
    }
  };

  // Query to display the list of all scenes
  const getScenesFromApi = async () => {
    try {
      const response = await fetch('http://64.225.72.25:5000/getscene', {
        method: 'GET',
      });
      const scenes = await response.json();
      setFilteredDataSource(scenes);
      setMasterDataSource(scenes);
      setLoading(false) 
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
        style= {styles.itemDate}>{day}.{month}</Badge>}
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

  //Handle Date menu selection
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  const today = new Date(); 
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  const getDatePlusDays = (value) =>{
    const newDate = new Date(year, month, day + value)
    return newDate.toISOString().split('T')[0]
  }
 

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
          
      <Provider>

          <Menu
            style={styles.menu}
            visible={visibleMenu}
            onDismiss={closeMenu}
            anchor={<TouchableOpacity 
              onPress={openMenu}
              style= {styles.buttonContainer}
              
              >
                  <Text>Date</Text>
                  <Text
                      style={{color:colors.dark, fontSize:12}}>{selectedDate}</Text>
                      <View style={{flexDirection:'row'}}>
                        <Button 
                        icon= "check"
                        onPress={() => {
                          getSelectedDate();
                          getScenesDateFilteredScenes();
                          setSearch('');
                          closeMenu();
                        }}
                        color = {colors.primary}
                        labelStyle={{color:colors.primary}}
                        compact={true}
                        /> 
                        <Button 
                        icon= "close"
                        onPress={() => {
                          setSelectedDate('');
                          getScenesFromApi();
                        }}
                        color = {colors.primary}
                        labelStyle={{color:colors.primary}}
                        compact={true}
                        /> 
                      </View>
                </TouchableOpacity>
                
                }
            >
            <Menu.Item onPress={() => {
              setSelectedDate(getDatePlusDays(7));
              closeMenu();
            }} title="La semaine prochaine" />
            <Menu.Item onPress={() => {
              setSelectedDate(getDatePlusDays(30));
              closeMenu();
              }} title={"Le mois prochain"} />
            <Divider />
            <Button_filter_Date
            name={"Choisir une date"}/>
          </Menu>

      </Provider>
      
        
      </View>
      {/* Results of the research */}
      <View
      style={{zIndex: 2}}>
        <FlatList
          style = {styles.listContainer}
          data = {filteredDataSource}
          renderItem = {({item}) => {
            return renderData(item)
          }}
          onRefresh = {() => getScenesFromApi()}
          refreshing = {loading}
          keyExtractor = {item => `${item.numscene}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    padding: 5,
    margin: 20,
    backgroundColor: colors.light,
    borderRadius: 15,
    alignItems: "center",
    paddingLeft:20,
  },
  container:{
    backgroundColor: colors.white,
  },
  filterContainer: {
    zIndex: 4,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
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
  menu: {
    position:"absolute",
    zIndex: 1000,
    top: 65,
  },
  searchinputStyle: {
    margin: 5,
    backgroundColor: colors.light,
    borderRadius:5,
  },
})

export default SearchSceneScreen;