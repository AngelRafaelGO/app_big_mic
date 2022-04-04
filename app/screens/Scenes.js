import React, {useEffect, useState} from 'react'
import { View, FlatList , StyleSheet, SafeAreaView} from "react-native";
import { Card , Badge, FAB} from 'react-native-paper';
import colors from '../config/colors';


const Scenes = ({navigation}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState('4')

    const clickedItem = (data) => {
      navigation.navigate('SceneDetails', {data:data})
    };

    //Item scene structure and filling
    const renderSceneList = (item) => {
      var month = '00';
      var day = '00';
      if(item.datescene !== null){
        const date = item.datescene.split('-');
        month = date[1];
        day = date[2];
      }
    return (
    <Card
    style={styles.itemContainer}
    onPress={()=>clickedItem(item)}>
      <Card.Title
        title={item.titrescene}
        subtitle={item.descscene}
        left={(props) => <Badge 
          size={50} 
          style= {styles.itemDate}>{day}.{month}</Badge>}
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
        <SafeAreaView style={styles.container}>
            <FlatList
          style = {styles.listContainer}
          data = {data}
          renderItem = {({item}) => {
            // console.log(data)
            return renderSceneList(item)
          }}
          onRefresh = {() => getScenesFromApi()}
          refreshing = {loading}
          keyExtractor = {item => `${item.numscene}`}
        />
        <View style = {styles.fabView}>
            <FAB
            small={true}
            icon="plus"
            color='white'
            theme= {{colors:{accent:colors.primary}}}
            onPress = {() => navigation.navigate('CreateScene')}
            />
          </ View>
        </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
    },
    fabView: {
        position: 'absolute',
        flexDirection: 'row',
        margin: 16,
        right: 0,
        bottom: 10
      },
    listContainer: {
        backgroundColor: colors.light,
        paddingTop: 10,
    },
    itemContainer: {
        marginHorizontal: 20,
        marginVertical: 5,
    },
    itemDate: {
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: colors.primary, 
        color: colors.white,
      },
  })
  
  export default Scenes;