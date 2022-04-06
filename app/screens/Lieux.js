import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {Card, FAB } from 'react-native-paper';




function Lieux({navigation}) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  const loadData = () => {
    fetch('http://64.225.72.25:5000/getlieu', {
        method : 'GET'
    })
    .then(resp => resp.json())
    .then(lieux => {
      setData(lieux),
      setLoading(false) 
    })
    .catch(error => console.log("ERROR caught:\n" + error))
  }

  useEffect(() =>{ 
    loadData();
  }, []);

  const clickedItem = (data) => {
      navigation.navigate('LieuDetails', {data:data});
      setLoading(false);
  }
  
  const renderData = (item) => {
    return (
    <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
      <Card.Title
        title={item.nomlieu}
        subtitle={item.lienlieu} />
        <Card.Cover source= {{ uri: 'https://picsum.photos/700'}} />
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
        keyExtractor = {item => `${item.numlieu}`}
      />
      <View style = {styles.fabView}>
      <FAB
          small={true}
          icon="plus"
          color='white'
          theme= {{colors:{accent:"rgb(255, 72, 88)"}}}
          onPress = {() => navigation.navigate('CreateLieu')}
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
  cardText2: {fontSize :18, paddingRight:5, paddingLeft: 5}
});

export default Lieux;