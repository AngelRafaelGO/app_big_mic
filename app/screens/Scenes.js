import React, {useEffect, useState} from 'react'
import { View, FlatList , StyleSheet} from "react-native";
import { Card , Badge} from 'react-native-paper';
import colors from '../config/colors';



const Scenes = ({navigation}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 

    //Item scene structure and filling
    const renderSceneList = (item) => {
    const date = item.datescene.split('-');
    const month = date[1];
    const day = date[2];
    return (
    <Card
    style={styles.itemContainer}
    onPress={()=>navigation.navigate("CreateScene", {item: item})}>
      <Card.Title
        title={item.titrescene}
        subtitle={item.descscene}
        left={(props) => <Badge 
          size={50} 
          style= {styles.date}>{day}.{month}</Badge>}
        />
      </Card>
      );
    }
  
    const getScenesFromApi = async () => {
      try {
        const response = await fetch('http://64.225.72.25:5000/getscene', {
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
  
  
    return (
      <View style={styles.container}>
        <FlatList
          style = {styles.listContainer}
          data = {data}
          renderItem = {({item}) => {
            // console.log(data)
            return renderSceneList(item)
          }}
          onRefresh = {() => loadData()}
          refreshing = {loading}
          keyExtractor = {item => `${item.numscene}`}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
        flex: 1,
      backgroundColor: colors.white,
    },
    listContainer: {
      backgroundColor: colors.light,
      paddingTop: 10,
    },
  })
  
  export default Scenes;