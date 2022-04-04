import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,  ScrollView} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import Button_filter_Date from '../../components/Button_filter_Date';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../../config/colors';

function SceneForm(props, {navigation}) {

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
            body: JSON.stringify({titrescene: titrescene, 
                datescene: datescene, 
                numphoto: numphoto, 
                criteres: criteres, 
                recurrence: recurrence, 
                adrscene: adrscene, 
                descscene: descscene, 
                numcompte: numcompte}),
        })
        .then(resp => resp.json())
        .then((data) => {
            props.navigation.navigate('Profil')
        })
        .catch(error => console.log("POST error: " + error))
    }

      //Get selectedDate on Calendar picker
    const getSelectedDate = async () => {
        try {
        const value = await AsyncStorage.getItem('@selectedDate')
        if(value !== null) {
            setSelectedDate(value) ;
        }
        } catch(e) {
        console.log("ASYNC Reading Storage error: " + e);
        }
    }

    //Reset selectedDate of calendar
    const removeValue = async () => {
        try {
        await AsyncStorage.setItem('@selectedDate', "")
        } catch(e) {
        console.log("ASYNC Removal error: " + e);
        }
        console.log('Done.')
    }
    
    //Calendar action
    const calendarAction = () =>{
        getSelectedDate();
        setdatescene(selectedDate);
        removeValue;
    }

    const [selectedDate, setSelectedDate] = useState('');
    console.log("Selected Date: " + selectedDate);

    return (
        console.log({titrescene: titrescene, 
            datescene: datescene, 
            numphoto: numphoto, 
            criteres: criteres, 
            recurrence: recurrence, 
            adrscene: adrscene, 
            descscene: descscene, 
            numcompte: numcompte}),
        <ScrollView styles={styles.container}> 
            <View style={{alignItems: 'center', marginTop: 50}} >
            <Image source={require('../../assets/SceneImage.png')} />

            </View>


            <Title
            style={{textAlign:'center'}}>Création de ma scène</Title>
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
                    <TextInput style={styles.textInput}
                                multiline
                                label = "Critères de participation"
                                value = {criteres}
                                mode="outlined"
                                onChangeText={ (val) => setcriteres(val)} />
                    <View style={styles.dateButtonContainer}>
                        <Button_filter_Date
                            name={"Choisir une date"}
                            style={styles.button}/>
                        <Text
                        style={{width:90}}>{datescene}</Text>
                        <Button
                        color={colors.primary}
                        onPress={()=> calendarAction()}>Valider</Button>
                    </View>
{/* 
                    <TextInput style={styles.textInput}
                                label = "Dates de la scène"
                                value = {datescene}
                                mode="outlined"
                                onChangeText={ (val) => setdatescene(val)} 
                                 /> */}
                    <TouchableOpacity   
                    style = {styles.button}
                    onPress = { () => insertData()}

                    >
                        <Text style={styles.textButton}> Soumettre la scène </Text>   
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
        alignItems:'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '40%',
        // height: 40, 
        // backgroundColor: colors.primary,
        borderRadius: 5,
        // marginTop: 20,
    },
    textButton: {
        margin: 10,
        color: colors.white,
        
    },
    dateButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
    },
});

export default SceneForm;