import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import colors from '../config/colors';

const Search_bar = () => {
    
    const [text, onChangeText] = useState('');
  
    return (
      <View style={styles.containerView}>
        <View style= {styles.containerBar}>
          <TextInput 
          style={styles.textInput}
          placeholder='Entrez votre recherche'
          onChangeText={newText => onChangeText(newText)}
          defaultValue={text}/>
          <TouchableOpacity
          style={styles.containerButton}
          onPress={()=> alert('Afficher la liste des scènes pour : '+ text)}
          >
            <Feather name="search" size={26} color="white" style={styles.button} />
          </TouchableOpacity>
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
    width: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerView: {
    alignItems: 'center',
    margin: 5,
  },
  textInput: {
    width: '80%',
    height:40 ,
    backgroundColor: colors.light,
    padding: 5,
    borderRadius: 5,
  },
})

export default Search_bar;
