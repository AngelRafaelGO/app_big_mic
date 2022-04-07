import { View, Text, ScrollView, StyleSheet, Image , Alert} from 'react-native'
import React from 'react';
import { Button} from 'react-native-paper';


function SceneDetails(props, {navigation}) {

    const data = props.route.params.data;
    

    const deleteData =  (data) => {

        fetch(`http://188.166.40.140:5000/deletescene/${data.numscene}`, {
            method : 'DELETE',
        })
        .then(data => {
            props.navigation.navigate('Profil')
        })
        .catch(error => {
            console.log("DELETE error: " + error)
            alert
        })
    };

    const confirmDeletion = () =>
    Alert.alert(
      "Supprimer la scène \n" + data.titrescene,
      "Confirmer la suppression",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "Cancel"
        },
        { text: "OK", onPress: () => deleteData(data) }
      ]
    );

  return (
   <ScrollView>

<View style = {styles.viewStyle}>
            <Text style = {{fontSize: 25}}>
                {data.titrescene}
            </Text>
            <Text style = {{fontSize: 15, marginTop: 15}}>
                {data.adrscene}
            </Text>
            <Text style = {{fontSize: 15, marginTop: 15}}>
                {data.descscene}
            </Text>
            <Text style = {{fontSize: 15, marginTop: 15}}>
                {data.criteres}
            </Text>
            <View style={styles.viewDate}>
                <Text style = {{fontSize: 15, marginTop: 15}}>
                    {data.datescene}
                </Text>
                <Text style = {{fontSize: 15, marginTop: 15}}>
                    {data.recurrence}
                </Text>
            </View>
            <View>
                <Image
                    style={styles.image}
                    source={{
                    uri: data.lienphoto,
                    }}/>
            </View>


            
            <View  style = {styles.btnStyle}>
            <Button style = {styles.btnInside}
                icon = "update"
                mode='contained'
                onPress={() => props.navigation.navigate("SceneFormEdit", {data:data})}> 
                Modifier
            </Button>
            <Button style = {styles.btnInside}
                icon = "delete"
                mode='contained'
                onPress={() => confirmDeletion()}> 
                Supprimer
            </Button>
            </View>
        </View>

   </ScrollView>
  )
};

const styles = StyleSheet.create ({
    image:{
        width:'80%',
        height:'50%',
        margin:10,
        alignItems: 'center',
        alignContent: 'center',
    },
    viewStyle: {
         padding: 10,
         margin: 10,
    },
    btnStyle: {
        flexDirection:"row",
        justifyContent:"space-around",
        margin: 10,
        padding: 5,
    },
    btnInside: {
        backgroundColor: '#FF4858',
        
    },
    viewDate: {
        flex:1,
        flexDirection: 'row',
    }    


});

export default SceneDetails;