import { StyleSheet, Text, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import colors from '../../config/colors';
import { Card, FAB, Subheading } from 'react-native-paper';
import { sendEmail } from './../../config/sendemail';


const UserCard = ({route, navigation}) => {

  //User information
  const {item} = route.params;
  console.log(item);

  // Datas for flatslists
  const [prestas, setPrestas] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [artist, setArtist] = useState([]);
  console.log(artist);
  
  //Fetch prestas from database
  const loadPrestas = () => {
    fetch(`http://64.225.72.25:5000/getfilteredpresta/${item.numcompte}`, {
        method : 'GET'
    })
    .then(resp => resp.json())
    .then(prestations => {
      setPrestas(prestations),
      setLoading(false) 
    })
    .catch(error => console.log("ERROR caught getting artist's prestations:\n" + error))
  }

  //Fetch Artist's information
  const getArtistInfo = () => {
    fetch(`http://64.225.72.25:5000/getcompte/${item.numcompte}`, {
        method : 'GET'
    })
    .then(resp => resp.json())
    .then(information => {
      setArtist(information),
      setLoading(false) 
    })
    .catch(error => console.log("ERROR caught getting artist's info:\n" + error))
  }
  
  useEffect(() =>{
    getArtistInfo();
    loadPrestas();
  }, []);
  
  const clickedItem = (prestas) => {
    navigation.navigate('Détails de la prestation', {prestas:prestas})
  }

  // Render prestas
  const renderPresta = (item) => {
    return (
    <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
      <Card.Title
        title={item.titreprest}
        subtitle={item.lienprest} />
        <Card.Cover source= {{ uri: 'https://picsum.photos/700'}} />
    </Card>
    )
  };

  
  
  return (

  <Card style={styles.sceneCard}>
    <Card.Title title={artist.nom + " " + artist.prenom} subtitle={artist.ville}/>
    <Card.Content>
      <Subheading>Activités</Subheading>
      {/* <FlatList 
       style = {styles.listContainer}
       data = {scenes}

       renderItem = {({scene}) => {
         // console.log(data)
         return renderData(scene)
       }}
       keyExtractor = {scene => `${scene.numscene}`}
       /> */}
       <FlatList
        data = {prestas}
        renderItem = {({item}) => {
          // console.log(data)
          return renderPresta(item)
        }}
        keyExtractor = {presta => `${presta.numprest}`}
        onRefresh = {() => loadData()}
        refreshing = {loading}
      />
    </Card.Content>
    <Card.Actions>
      <FAB 
      label='Contacter'
      style= {styles.fab}
      icon="email"
      color={colors.white}
      onPress={()=>alert("Envoyer un message à la personne")}
        />
    </Card.Actions>
  </Card>

  )
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.primary,
  },
  sceneCard: {
    margin: 20,
    padding: 10,
  },
})

export default UserCard;
