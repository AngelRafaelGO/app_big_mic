import React, {useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

const Search_bar = () => {
    
    const [text, onChangeText] = useState('');
  
    return (
      <View style={styles.containerView}>
       <Text> Rechercher une scène </Text>
        <View style= {styles.containerBar}>
          <TextInput 
          style={styles.textInput}
          placeholder='Entrez votre recherche'
          onChangeText={newText => onChangeText(newText)}
          defaultValue={text}/>
          <View style={styles.containerButton}>
            <Button 
            style= {styles.button}
            title="Rechercher"
            onPress={()=> alert('Afficher la liste des scènes pour : '+ text)}
            />
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  containerBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerButton: {
    backgroundColor: colors.primary,
    width: '28%',
    borderRadius: 5,
  },
  containerView: {
    alignItems: 'center',
    margin: 5,
  },
  textInput: {
    width: '68%',
    height:40 ,
    backgroundColor: colors.light,
    padding: 5,
    borderRadius: 5,
  },
})

export default Search_bar;
