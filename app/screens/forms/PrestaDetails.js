import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import { Button} from 'react-native-paper';
import PrestaCard from '../cards/PrestaCard';


function PrestaDetails(props, {navigation}) {
    const data = props.route.params.data;

    const deleteData =  (data) => {
        fetch(`http://64.225.72.25:5000/deletepresta/${data.numprest}`, {
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
                {data.titreprest}
            </Text>
            <Text style = {{fontSize: 15, marginTop: 15}}>
                {data.descprest}
            </Text>
            <Text style = {{fontSize: 15, marginTop: 15}}>
                {data.lienprest}
            </Text>
            <Text style = {{fontSize: 12, marginTop: 15}}>
                {data.numcompte} - {data.numprest}
            </Text>
            <View  style = {styles.btnStyle}>
            <Button style = {styles.btnInside}
                icon = "update"
                mode='contained'
                onPress={() => props.navigation.navigate("EditPresta", {data:data})}> 
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

    }

})

export default PrestaDetails