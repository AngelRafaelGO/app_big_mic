import React , {useState, useEffect}from 'react';
import { View, StyleSheet, FlatList, Alert, Image} from 'react-native';
import colors from '../config/colors';
import {Button_filter_Tag, Search_bar} from '../components/componentsIndex';
import { IconButton, Card } from 'react-native-paper';

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
];

const SearchUserScreen = ({navigation}) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 

  

  const getScenesFromApi = async () => {
    try {
      const response = await fetch('http://64.225.72.25:5000/getcompte', {
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
    return (
    <Card
      style={styles.itemContainer}
      onPress={()=>navigation.navigate("Détails compte", {item: item})}>
        <Card.Title
          title={item.nom + " "+ item.prenom}
          subtitle={item.ville}
          left={(props) => <Image style={styles.thumbnail}
          source={require('../assets/default-avatar-profile-icon.jpeg')}/>}
          right={(props) => <IconButton 
            icon="email" 
            onPress={() => Alert.alert("Envoyer un message à la personne")}
            color={colors.primary} />}
          />
      </Card>
      );
    }


//Action when user clicks on an item of the resulted search
const set_action = () => {
  Alert.alert('Aller vers la fiche selectionnée');
};

const set_filter = () => {
  Alert.alert('Selectionner les paramètres du filtre + rafraichir');
};



  return (
    <View style={styles.container}>
      <Search_bar />
      <View style={styles.filterContainer}>  
        <Button_filter_Tag name="Tag"
        set_action= {set_filter}
        tagList={tagList} />
        <Button_filter_Tag name="Rôle"
        tagList={roleList}
        set_action= {set_filter}
         />
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
        keyExtractor = {item => `${item.numcompte}`}
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
  shadowProp: {
    shadowColor: colors.dark,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
})

export default SearchUserScreen;