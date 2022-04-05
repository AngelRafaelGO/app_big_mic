import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react';
import { Button} from 'react-native-paper';




function SceneDetails(props, {navigation}) {

    const data = props.route.params.data;
    

    const deleteData =  (data) => {
        fetch(`http://64.225.72.25:5000/deletescene/${data.numscene}`, {
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
                onPress={() => deleteData(data)}> 
                Supprimer
            </Button>
            </View>
        </View>

   </ScrollView>
  )
};

const styles = StyleSheet.create ({
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