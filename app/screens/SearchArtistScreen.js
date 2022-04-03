import React , {useState, useEffect}from 'react';
import { View, StyleSheet, FlatList, Image} from 'react-native';
import colors from '../config/colors';
import { Card, Searchbar} from 'react-native-paper';

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
];

const roleList = [
  {
    id: 1,
    name: "Organisateur"
  },
  {
    id: 2,
    name: "Exploitant"
  },
  {
    id: 3,
    name: "Artiste"
  }
]; */

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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 

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

  console.log(data);

  useEffect(() =>{ 
    getPrestasFromApi()
  }, []);

  //Research result item structure and filling
  const renderData = (item) => {
    return (
    <Card
      style={styles.itemContainer}
      onPress={()=>navigation.navigate("Détails compte", {item: item})}>
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
    <View style={styles.container}>
      <Searchbar
      placeholder="Entrez votre recherche"
      onChangeText={(text) => searchFilterFunction(text)}
      value={search}
      iconColor={colors.primary}
      inputStyle={styles.searchinputStyle}
    />
      <View style={styles.filterContainer}>  
        {/* <Button_filter_Tag name="Tag"
        set_action= {set_filter}
        tagList={tagList} /> 
        <Button_filter_Tag name="Rôle"
        tagList={roleList}
        set_action= {set_filter}
         />
          <Button 
        icon= "filter"
        onPress={() => console.log("Filters applied")}
        color = {colors.primary}
        labelStyle={{color:colors.primary}}
        compact={true}
        > Appliquer </Button>*/}
      </View>
      {/* Results of the research */}
      <FlatList
        style = {styles.listContainer}
        data = {filteredDataSource}
        renderItem = {({item}) => {
          // console.log(data)
          return renderData(item)
        }}
        onRefresh = {() => loadData()}
        refreshing = {loading}
        keyExtractor = {item => `${item.numprest}`}
      />
    </View>
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
    paddingTop: 10,
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