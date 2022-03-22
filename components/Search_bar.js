import React from 'react';
import {TextInput, Button, View, Text } from 'react-native';

const Search_bar = () => {
    
    const [text, onChangeText] = React.useState("Useless Text");
  
    return (
      <View>
       <Text> Rechercher une scène </Text>
        <TextInput />
        <Button
        title="Rechercher"
        value = {text}
        onPress={()=> alert('Afficher la liste des scènes pour : '+ text)}
        />
      </View>
    );
  };

export default Search_bar;
