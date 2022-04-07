import { StyleSheet, Text, FlatList, View, Linking , Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import colors from '../../config/colors';
import { Card, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const UserCard = ({route, navigation}) => {

  //Send a mail to user
  const sendMail = () => {
    fetch(`http://188.166.40.140:5000/getcompte/${item.numcompte}`, {
      method : 'GET'
    })
    .then(resp => resp.json())
    .then(contact => {
      if(contact.mail != ''){
        const message = 'mailto:' + contact.mail + '?subject=' + item.titrescene + '&body='+'Bonjour ' +  contact.pseudo ;
        // console.log(message);
        Linking.openURL(message);
      } else {
        Alert.alert("pas d'adresse email définie")
      }
    }
    )
    .catch(error => console.log("No mail sent :\n" + error))
  }

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
    fetch(`http://188.166.40.140:5000/getfilteredpresta/${item.numcompte}`, {
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
    fetch(`http://188.166.40.140:5000/getcompte/${item.numcompte}`, {
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
    <SafeAreaView>
      <Card style={styles.userCard}>
        <Card.Title 
        title={artist.nom + " " + artist.prenom} 
        subtitle={artist.ville}
        right={(props) => <IconButton 
          style={styles.button}
          color={colors.white}
          icon="email" 
          onPress={() => {sendMail()}} />}/>
          </Card>
          <FlatList
            style={{margin:10}}
            data = {prestas}
            renderItem = {({item}) => {
              return renderPresta(item)
            }}
            keyExtractor = {presta => `${presta.numprest}`}
            onRefresh = {() => loadData()}
            refreshing = {loading}
              />
    </SafeAreaView>


  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
  },
  userCard: {
    margin: 10,
  },
})

export default UserCard;
