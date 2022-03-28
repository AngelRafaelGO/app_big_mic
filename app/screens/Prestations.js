import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {Card, FAB, Avatar} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import colors from '../config/colors';




function Prestations({navigation}) {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  const loadData = () => {
    fetch('http://64.225.72.25:5000/get', {
        method : 'GET'
    })
    .then(resp => resp.json())
    .then(prestations => {
      setData(prestations),
      setLoading(false) 
    })
    .catch(error => console.log("ERROR caught:\n" + error))
  }

  useEffect(() =>{ 
    loadData()
  }, []);

  const clickedItem = (data) => {
      props.navigation.navigate('Details', {data:data})
  }
  
  const renderData = (item) => {
    return (
    <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
      <Card.Title
        title={item.titreprest}
        subtitle={item.lienprest}
        left={(props) => <Avatar.Image size={40} source={require('../assets/freebanner.png')} />}
        right={(props) => <AntDesign name="hearto" size={20} color={colors.primary} style={{paddingRight:15}}/>
        }
      />
      {/* <View style = {styles.cardView}>
        <View style = {styles.cardIndex}>
          <Text style = {styles.cardText1}>
          {item.numprest}
          </Text>
        </View>
          <Text style = {styles.cardText2}>
          {item.titreprest} 
          </Text>
      </View> */}
    </Card>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data = {data}
        renderItem = {({item}) => {
          // console.log(data)
          return renderData(item)
        }}
        onRefresh = {() => loadData()}
        refreshing = {loading}
        keyExtractor = {item => `${item.numprest}`}
      />
      <View style = {styles.fabView}>
      <FAB
          small={false}
          icon="pencil"
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
    // marginTop: 50,
  },
  fabView: {
    position: 'absolute',
    flexDirection: 'row',
    // margin: 16,
    right: 10,
    top: 10
  },
  fabBtn: {
    margin: 50,
    padding: 50,
  },
  cardStyle:{
    width : 350,
    backgroundColor : '#eeeeee',
    margin : 10,
    // padding: 10,
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
  cardText2: {fontSize :18, paddingRight:5, paddingLeft: 5}
});

export default Prestations;