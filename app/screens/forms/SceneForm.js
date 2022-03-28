import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput,ScrollView, Button } from 'react-native';

import colors from '../../config/colors';

function SceneForm() {

    const [sceneTitle, setSceneTitle] = useState('');
    const [sceneAdress, setSceneAdress] = useState('');
    const [sceneDescription, setSceneDescription] = useState('');
    const [sceneTags, setSceneTags] = useState('');
    const [sceneRequirement, setSceneRequirement] = useState('');
    const [sceneDate, setSceneDate] = useState('');
    const [sceneImage, setSceneImage] = useState('');

    return (
        <ScrollView> 
            <Text> Création de ma scène  </Text>
            <View styles={styles.container}>
                    <Text styles={styles.textOne}> Titre de la scène : </Text>
                    <TextInput style={styles.textInput}
                                onChangeText={ (val) => setSceneTitle(val)} />
                    <Text styles={styles.textOne}> Adresse de la scène :</Text>
                    <TextInput style={styles.textInput}
                                onChangeText={ (val) => setSceneAdress(val)} />
                    <Text styles={styles.textOne}> Description :</Text>
                    <TextInput style={styles.textInput} multiline={true}
                                onChangeText={ (val) => setSceneDescription(val)} />
                    <Text styles={styles.textOne}> Tags :</Text>
                    <TextInput style={styles.textInput}
                                onChangeText={ (val) => setSceneTags(val)} />
                    <Text styles={styles.textOne}> Critères de participation :</Text>
                    <TextInput style={styles.textInput}
                                multiline
                                onChangeText={ (val) => setSceneRequirement(val)} />
                    <Text styles={styles.textOne}> Dates de la scène</Text>
                    <TextInput style={styles.textInput}
                                onChangeText={ (val) => setSceneDate(val)} 
                                keyboardType='numeric' />
                    <Text styles={styles.textOne}> Charger une photo pour la scène :</Text>
                    <Button title="Valider" color='red' borderRadius= '50' fontWeight="bold" padding='20'  
                    onPress = { () => {
                            if ( sceneTitle == '' ||  sceneAdress == '' ||  sceneDescription == '' || sceneTags== '' || sceneRequirement == '' || sceneDate== '' ) {
                                alert('Vous n\'avez pas rentré toutes les données');
                            };
                        }
                    }
                    />       
            </View>   
        </ScrollView>
    );
};
 
const styles = StyleSheet.create({
    container: { 
        flex:1,
        alignItems:"center",
        padding:20,
        margin:10,
        marginTop: 10,
        height: 100,  
    },
    textOne: {
        fontWeight: 'bold',   
    },
    textInput: { 
        backgroundColor: colors.light,
        borderRadius: 10,
        height: 32,
        width: '90%',
        padding: 5,
        margin:15,
    },
});

export default SceneForm;