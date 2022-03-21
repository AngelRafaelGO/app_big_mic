import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-web';

class Search_scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
        <Text> Rechercher une scène </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Button
        title="Rechercher"
        onPress={()=> Alert.alert('Afficher la liste des scènes')}
        />

      </SafeAreaView>
    );
  }
}

export default search_scene;
