import React, { useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
//import { routeParams } from '../navigation/routesNavigator';

function EditPresta(props, {navigation}) {

    const data = props.route.params.data;

    const [numcompte, setnumcompte] = useState(data.numcompte)
    const [titreprest, settitreprest] = useState(data.titreprest)
    const [descprest, setdescprest] = useState(data.descprest)
    const [lienprest, setlienprest] = useState(data.lienprest)

    const updateData = (navigation) => {
        fetch(`http://64.225.72.25:5000/updatepresta/${data.numprest}`, { 
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({numcompte:numcompte, titreprest:titreprest, descprest:descprest, lienprest:lienprest})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('PrestaDetails', {data:data})
        })
        .catch(error => console.log("PUT error: " + error))
    }
    


  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
    <View style = {styles.viewStyle}>
        <TextInput style = {styles.textInputStyle}
            label = "Titre"
            value = {titreprest}
            mode="outlined"
            onChangeText = {text => settitreprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Description"
            value = {descprest}
            mode="outlined"
            multiline
            numberOfLines={10}
            onChangeText = {text => setdescprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Lien"
            value = {lienprest}
            mode="outlined"
            onChangeText = {text => setlienprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Compte"
            keyboardType='numeric'
            value = {numcompte.toString()}
            mode="outlined"
            onChangeText = {text => setnumcompte(parseInt(text))}
        />
        <Button style = {styles.btnStyle}
            icon = "pencil"
            mode='contained'
            onPress={() => updateData(navigation)}>
            Modifier
        </ Button>
    </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create ({
    safeAreaStyle: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '100%',
    },
    viewStyle: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // // marginTop: 30,
        // padding: 10,
        // width: '100%',
        // height: '100%',
    },
    textInputStyle: {
        margin: 10,
        // width: '100%',
        // height: 40,
    },
    btnStyle: {
        margin: 30,
        backgroundColor: '#FF4858'
        // height: 60,
        // width: '100%'
    }
})

export default EditPresta;