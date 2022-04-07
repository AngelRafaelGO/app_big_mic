import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {Card, FAB, Avatar, Title, Paragraph} from 'react-native-paper';
import {AuthContext} from '../config/context';
import { AntDesign } from '@expo/vector-icons'; 
import colors from '../config/colors';

function Prestations({navigation}) {


  const {getData} = React.useContext(AuthContext);
  const currentUsr = getData();
  const { numcompte } = currentUsr[0];
  const { pseudo } = currentUsr[0];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [isAdmin, setAdmin] = useState(false); 

  const [numphoto, setnumphoto] = useState(null);
  const [fichierphoto, setfichierphoto] = useState('');
  
  const getphoto = (navigation) => {
    if(numphoto != null){
        fetch(`http://188.166.40.140:5000/getphoto/${numphoto}`, { 
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp.fichierphoto);
          setfichierphoto(resp.fichierphoto);
        })   
        .catch(error => console.log("PUT error: " + error))
    }
  }


  const loadAdminData = () => {
    fetch('http://188.166.40.140:5000/getpresta', {
        method : 'GET'
    })
    .then(resp => resp.json())
    .then(prestations => {
      setData(prestations),
      setLoading(false) 
    })
    .catch(error => console.log("ERROR caught:\n" + error))
  }

  const loadData = () => {
    if(pseudo == "the Great Band"){
      loadAdminData();
    } else {
      fetch(`http://188.166.40.140:5000/getfilteredpresta/${numcompte}`, {
          method : 'GET'
      })
      .then(resp => resp.json())
      .then(prestations => {
        setData(prestations),
        setLoading(false) 
      })
      .catch(error => console.log("ERROR caught:\n" + error))
    }
  }

  useEffect(() =>{ 
    loadData();
  }, []);

  const clickedItem = (data) => {
      navigation.navigate('PrestaDetails', {data:data})
  }
  
  const renderData = (item) => {

    setnumphoto(item.numphoto);
    console.log('render data - numphoto' + numphoto);
    getphoto();
    if(fichierphoto == ''){
      setfichierphoto('https://picsum.photos/700');
    }

    return (
    <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
      <Card.Title
        title={item.titreprest}
        subtitle={item.lienprest} />

        <Card.Cover source= {{ uri: fichierphoto}} />
    </Card>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data = {data}
        renderItem = {({item}) => {
          return renderData(item)
        }}
        onRefresh = {() => loadData()}
        refreshing = {loading}
        keyExtractor = {item => `${item.numprest}`}
      />
      <View style = {styles.fabView}>
      <FAB
          small={true}
          icon="plus"
          color='white'
          // label='add'
          theme= {{colors:{accent:"rgb(255, 72, 88)"}}}
          onPress = {() => navigation.navigate('CreatePresta')}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabView: {
    position: 'absolute',
    flexDirection: 'row',
    right: 10,
    bottom: 10
  },
  fabBtn: {
    margin: 50,
    padding: 50,
  },
  cardStyle:{
    width : 340,
    backgroundColor : '#eeeeee',
    margin : 5,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIndex: {
    padding: 10,
    backgroundColor: 'rgb(255, 72, 88)',
    width: 50,
  },
  cardText1: {color : 'white', fontSize :18, alignItems:'center', justifyContent: 'center'},
  cardText2: {fontSize :18, paddingRight:5, paddingLeft: 5},
});

export default Prestations;