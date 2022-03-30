import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,  ScrollView } from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import colors from '../../config/colors';

function SceneForm({navigation}) {

    const [sceneTitle, setSceneTitle] = useState('');
    const [sceneAdress, setSceneAdress] = useState('');
    const [sceneDescription, setSceneDescription] = useState('');
    const [sceneTags, setSceneTags] = useState('');
    const [sceneRequirement, setSceneRequirement] = useState('');
    const [sceneDate, setSceneDate] = useState('');
    const [sceneImage, setSceneImage] = useState('');


    return (
        <ScrollView styles={styles.container}> 


            <Text> Création de ma scène  </Text>
            <View>
                    
                    <TextInput style={styles.textInput}
                                label = "Titre de la scène"
                                value = {sceneTitle}
                                mode="outlined"
                                onChangeText={ (val) => setSceneTitle(val)}/>          
                    <TextInput style={styles.textInput}
                            label = "Adresse de la scène"
                            value = {sceneAdress}
                            mode="outlined"
                            onChangeText={ (val) => setSceneAdress(val)} />
                    <TextInput style={styles.textInput} multiline={true}
                                label = "Description"
                                value = {sceneDescription}
                                mode="outlined"
                                onChangeText={ (val) => setSceneDescription(val)} />
                    <TextInput style={styles.textInput}
                                label = "Tags"
                                value = {sceneTags}
                                mode="outlined"
                                onChangeText={ (val) => setSceneTags(val)} />
                    <TextInput style={styles.textInput}
                                multiline
                                label = "Critères de participation"
                                value = {sceneRequirement}
                                mode="outlined"
                                onChangeText={ (val) => setSceneRequirement(val)} />
                    <TextInput style={styles.textInput}
                                label = "Dates de la scène"
                                value = {sceneDate}
                                mode="outlined"
                                onChangeText={ (val) => setSceneDate(val)} 
                                keyboardType='numeric' />
                    <TouchableOpacity   
                    style = {styles.button}
                    onPress = { () => {navigation.navigate('SceneCard');

                            // if ( sceneTitle == '' ||  sceneAdress == '' ||  sceneDescription == '' || sceneTags== '' || sceneRequirement == '' || sceneDate== '' ) {
                            //     alert('Vous n\'avez pas rentré toutes les données');
                            // };
                            // else {
                            //     navigation.navigate('SceneCard');
                        }
                        }
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
        backgroundColor: colors.light,
        borderRadius: 10,
        height: 32,
        width: '90%',
        padding: 5,
        margin:15,
    },
    button: {
        margin: 30,
        backgroundColor: '#FF4858',
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
    }
});

export default SceneForm;