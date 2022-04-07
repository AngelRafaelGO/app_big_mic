import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList , SafeAreaView} from 'react-native';
import {Card, FAB, } from 'react-native-paper';
import {AuthContext} from '../config/context';

function Prestations({navigation}) {


  const {getData} = React.useContext(AuthContext);
  const currentUsr = getData();
  const { numcompte } = currentUsr[0];
  const { pseudo } = currentUsr[0];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [isAdmin, setAdmin] = useState(false); 
  
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
    return (
    <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
      <Card.Title
        title={item.titreprest}
        subtitle={item.lienprest} />

        <Card.Cover source= {{ uri: 'https://picsum.photos/700'}} />
    </Card>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
          <FAB
          small={true}
          icon="refresh"
          color='white'
          // label='add'
          theme= {{colors:{accent:"rgb(255, 72, 88)"}}}
          onPress = {() => loadData()}
          />
      </View>
    </SafeAreaView>
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
    width: 90,
    justifyContent: 'space-between',
    margin: 15,
    right: 0,
    bottom: 10
  },
  cardStyle:{
    width : 340,
    backgroundColor : '#eeeeee',
    margin : 5,
  },
});

export default Prestations;