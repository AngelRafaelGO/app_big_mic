import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, useNavigation, ScrollView } from 'react-native';



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
    button: {
        
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40, 
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginTop: 20,
    },
    textButton: {
        color: colors.white,
    }
});

export default SceneForm;