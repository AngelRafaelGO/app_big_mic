import React from 'react';
import { View, Text , Alert, Button} from 'react-native';

const Search_filters = () => {

  return (
      <View>
        <Text> Filtres </Text>
        
        <Button 
        title="Style"
        onPress={()=> Alert.alert('Liste de tags à sélectionner')}
        />
        <Button 
        title="Arrondissement"
        onPress={()=> Alert.alert('Liste des arrondissements')}
        />
      </View>
    );
  
}

export default Search_filters;
