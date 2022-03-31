import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,  ScrollView , Style} from 'react-native';
import {TextInput, Button, Dialog} from 'react-native-paper';
import {Button_filter_Date, SelectDate }from '../../components/componentsIndex';


import colors from '../../config/colors';

function SceneForm({navigation}) {

    const [titrescene, settitrescene] = useState('');
    const [adrscene, setadrscene] = useState('');
    const [descscene, setdescscene] = useState('');
    const [criteres, setcriteres] = useState('');
    const [datescene, setdatescene] = useState('');
    const [recurrence, setrecurrence] = useState('');
    const [numphoto, setnumphoto] = useState(1);
    const [numcompte, setnumcompte] = useState(2);

    const insertData = () => {
        fetch('http://64.225.72.25:5000/addscene', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({titrescene: titrescene, datescene: datescene, numphoto: numphoto, criteres: criteres, recurrence: recurrence, adrscene: adrscene, descscene: descscene, numcompte: numcompte})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Profil')
        })
        .catch(error => console.log("POST error: " + error))
    }

    const [selectedDate, setSelectedDate] = useState('');

    return (
        <ScrollView styles={styles.container}> 
            <View style={{alignItems: 'center', marginTop: 50}} >
            <Image source={require('../../assets/SceneImage.png')} />

            </View>

            <Text style={{fontWeight: 'bold', margin: 20, fontSize: 20, alignItems:'center', textAlign:'center' }}> Création de ma scène  </Text>
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
                    <Button_filter_Date 
                                name= {'choisissez la date'}
                                 />
                                 <Text>{selectedDate}</Text>
                    <TouchableOpacity   
                    style = {styles.button}
                    onPress = { () => insertData()}

                    >
                        <Text style={styles.textButton}> Valider </Text>   
                        </TouchableOpacity>      
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

export default SceneForm;