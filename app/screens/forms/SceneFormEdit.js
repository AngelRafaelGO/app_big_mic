import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,  ScrollView , Style} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Button_filter_Date from '../../components/Button_filter_Date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../config/colors';
import { AuthContext } from '../../config/context';

function SceneFormEdit (props,{navigation}) {

    //Get user numcompte to display his entries on his profile
    const { getData } = React.useContext(AuthContext);
    const Id = getData();
    const {numcompte} = Id[0];

    const item = props.route.params.data;

    const [titrescene, settitrescene] = useState(item.titrescene);
    const [adrscene, setadrscene] = useState(item.adrscene);
    const [descscene, setdescscene] = useState(item.descscene);
    const [criteres, setcriteres] = useState(item.criteres);
    const [datescene, setdatescene] = useState(item.datescene);
    const [recurrence, setrecurrence] = useState(item.recurrence);
    const [numphoto, setnumphoto] = useState(1);
    const [lienphoto, setlienphoto] = useState(item.lienphoto);

    
    const updateData = () => {
        if(titrescene == ''){
            alert("Votre scène n'a pas de titre!");
        } else if (adrscene == ''){
            alert("Votre scène n'a pas d'adresse!");
        } else if (datescene == ''){
            alert("Votre scène n'a pas de date!");
        } else {
            fetch(`http://64.225.72.25:5000/updatescene/${item.numscene}`, {
                method : 'PUT',
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
                    numcompte: numcompte,
                    lienphoto: lienphoto,
                })
            })
            .then(resp => resp.json())
            .then(data => {
                props.navigation.navigate('Profil')
            })
            .catch(error => console.log("PUT error: " + error))
    }
}
    
    //Get selectedDate on Calendar picker
    const getSelectedDate = async () => {
        try {
        const value = await AsyncStorage.getItem('@selectedDate')
        if(value !== null) {
            setdatescene(value) ;
        }
        } catch(e) {
        console.log("ASYNC Reading Storage error: " + e);
        }
    }
    

    //Reset selectedDate of calendar
    const removeValue = async () => {
        try {
        await AsyncStorage.setItem('@selectedDate', '')
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

    useEffect(() =>{ 
          setdatescene(selectedDate);
      }, [selectedDate]);

    const [selectedDate, setSelectedDate] = useState('');
    console.log("Selected Date: " + datescene);

    return (
        <ScrollView styles={styles.container}>

            <Text style={{fontWeight: 'bold', 
                margin: 20, 
                fontSize: 20, 
                alignItems:'center', 
                textAlign:'center', 
                marginTop:15 }}> Editer ma scène  </Text>
        
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
             <TextInput style={styles.textInput}
                        multiline
                        label = "Lien vers l'affiche de votre scène"
                        value = {lienphoto}
                        mode="outlined"
                        onChangeText={ (val) => setlienphoto(val)} />
            
            
            <View style={styles.dateButtonContainer}>
                <Button_filter_Date
                    name={"Choisir une date"}
                    background={colors.secondary}
                    border={15}
                    padding= {10}
                    onPress={console.log("Press")}/>
                <Text style={{color:colors.dark, fontSize:12, width: "30%"}}>{datescene}</Text>
                <View style={{flexDirection:'row'}}>
                    <Button 
                    icon= "check"
                    onPress={() => calendarAction()}
                    color = {colors.primary}
                    labelStyle={{color:colors.primary}}
                    compact={true}
                    /> 
                    <Button 
                    icon= "close"
                    onPress={() => {setdatescene('');
                                    removeValue();
                                    getSelectedDate();}}
                    color = {colors.primary}
                    labelStyle={{color:colors.primary}}
                    compact={true}
                    /> 
                </View>
            </View>
            <Image style= {{marginLeft: 'auto',marginRight: 'auto', margin: 20}} source={require('../../assets/SceneImage.png')} />

            <TouchableOpacity   
            style = {styles.button}
            icon="pencil"
            onPress = { () => updateData()}>
            <Text style={styles.textButton}> Modifier </Text>   
            </TouchableOpacity>     
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
        marginLeft:10,
        marginRight:10,
        marginBottom:5,  
    },
    button: {
        
        margin: 20,
        backgroundColor: '#FF4858',
        alignItems:'center'
    },
    dateButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
    },
    textButton: {
        margin: 10,
        color: colors.white,
        fontWeight: 'bold',
        fontSize:15,  
    }
});

export default SceneFormEdit;