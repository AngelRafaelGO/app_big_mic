import React , {useState, useEffect}from 'react';
import { View, StyleSheet, FlatList, Image, SafeAreaView} from 'react-native';
import colors from '../config/colors';
import { Card, Searchbar} from 'react-native-paper';

const SearchUserScreen = ({navigation}) => {

  //Search artist function
  //Search bar variables
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      const keywords = text.split(" ");
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const searchtext = item.descprest + " " + item.titreprest;
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

  const getPrestasFromApi = async () => {
    try {
      const response = await fetch('http://64.225.72.25:5000/getpresta', {
        method: 'GET',
      });
      const prestas = await response.json();
      setFilteredDataSource(prestas);
      setMasterDataSource(prestas);
    } catch (error) {
      console.error("ERROR in query:" + error);
    }
  };


  useEffect(() =>{ 
    getPrestasFromApi()
  }, []);

  //Research result item structure and filling
  const renderData = (item) => {
    return (
    <Card
      style={styles.itemContainer}
      onPress={()=>navigation.navigate("Détails compte", {item: item})}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700'}} />
        <Card.Title
          title={item.titreprest}
          subtitle={item.descprest}
          left={(props) => <Image style={styles.thumbnail}
          source={require('../assets/default-avatar-profile-icon.jpeg')}/>}
          />
      </Card>
      );
    }



  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
      placeholder="Entrez votre recherche"
      onChangeText={(text) => searchFilterFunction(text)}
      value={search}
      iconColor={colors.primary}
      inputStyle={styles.searchinputStyle}
    />
      <View style={styles.filterContainer}>  
      </View>
      {/* Results of the research */}
      <FlatList
        style = {styles.listContainer}
        data = {filteredDataSource}
        renderItem = {({item}) => {
          // console.log(data)
          return renderData(item)
        }}
        keyExtractor = {item => `${item.numprest}`}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  listContainer: {
    backgroundColor: colors.light,
    height: '95%'
  },
  itemContainer: {
    marginVertical:5,
    marginHorizontal: 20,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchinputStyle: {
    margin: 5,
    backgroundColor: colors.light,
    borderRadius:5,
  },
})

export default SearchUserScreen;