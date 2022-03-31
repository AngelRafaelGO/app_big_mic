import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,  ScrollView , Style} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import colors from '../../config/colors';

function SceneFormEdit ({navigation, route}, props) {

    const {item} = route.params;
    console.log(item);

    const [titrescene, settitrescene] = useState(item.titrescene);
    const [adrscene, setadrscene] = useState(item.adrscene);
    const [descscene, setdescscene] = useState(item.descscene);
    const [criteres, setcriteres] = useState(item.criteres);
    const [datescene, setdatescene] = useState(item.datescene);
    const [recurrence, setrecurrence] = useState(item.recurrence);
    const [numphoto, setnumphoto] = useState(1);
    const [numcompte, setnumcompte] = useState(2);

    const deleteData = () => {
        fetch(`http://64.225.72.25:5000/deletescene/${item.numscene}`,{
            method: 'DELETE'
        })
        .then(data => {
            navigation.navigate('Profil')
            })

        .catch(error => console.log('delete error' + error)) 
    }

    const updateData = () => {
        fetch(`http://64.225.72.25:5000/updatescene/${item.numscene}`, {
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({titrescene: titrescene, datescene: datescene, numphoto: numphoto, criteres: criteres, recurrence: recurrence, adrscene: adrscene, descscene: descscene, numcompte: numcompte})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Profil')
        })
        .catch(error => console.log("PUT error: " + error))
    }

    return (
        <ScrollView styles={styles.container}> 
            <View style={{alignItems: 'center', marginTop: 50}} >
            <Image source={require('../../assets/SceneImage.png')} />

            </View>


            <Text style={{fontWeight: 'bold', margin: 20, fontSize: 20, alignItems:'center', textAlign:'center' }}> Editer ma scène  </Text>
            <View>
                    
                    <TextInput style={styles.textInput}
                                label = "Titre de la scène"
                                value = {titrescene}
                                mode="outlined"
                                onChangeText={ (val) => settitrescene(val)}/>          
                    <TextInput style={styles.textInput}
                            label = "Adresse de la scène"
                            value = {adrscene}
                            mode="outlined"
                            onChangeText={ (val) => setadrscene(val)} />
                    <TextInput style={styles.textInput} multiline={true}
                                label = "Description"
                                value = {descscene}
                                mode="outlined"
                                onChangeText={ (val) => setdescscene(val)} />
                    {/* <TextInput style={styles.textInput}
                                label = "Tags"
                                value = {sceneTags}
                                mode="outlined"
                                onChangeText={ (val) => setSceneTags(val)} /> */}
                    <TextInput style={styles.textInput}
                                multiline
                                label = "Critères de participation"
                                value = {criteres}
                                mode="outlined"
                                onChangeText={ (val) => setcriteres(val)} />
                    <TextInput style={styles.textInput}
                                label = "Dates de la scène"
                                value = {datescene}
                                mode="outlined"
                                onChangeText={ (val) => setdatescene(val)} 
                                 />
                    <View style={{flex:1, alignItems: 'center'}}>
                        <TouchableOpacity   
                        style = {styles.button}
                        onPress = { () => updateData()}>
                        <Text style={styles.textButton}> Modifier </Text>   
                        </TouchableOpacity>   

                        <TouchableOpacity   
                        style = {styles.button}
                        onPress = { () => deleteData()}>
                        <Text style={styles.textButton}> Supprimer </Text>   
                        </TouchableOpacity>  
                    </View>   

            </View>   
        </ScrollView>
    );
};
 
const styles = StyleSheet.create({
    container: { 
        flex:1,
        justifyContent:"center",
        alignItems:"center", 
    },
    textInput: { 
        // borderRadius: 10,
        // height: 32,
        // width: '90%',
        // padding: 5,
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        
    },
    button: {
        margin: 30,
        backgroundColor: '#FF4858',
        alignItems:'center'
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '40%',
        // height: 40, 
        // backgroundColor: colors.primary,
        // borderRadius: 5,
        // marginTop: 20,
    },
    textButton: {
        margin: 10,
        color: colors.white,
        fontWeight: 'bold',
        fontSize:15,
        
    }
});

export default SceneFormEdit;