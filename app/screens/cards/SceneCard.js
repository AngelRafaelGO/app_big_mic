import React, {useState} from 'react'
import { View, Text , ScrollView, Button, StyleSheet, TouchableOpacity, ScroolView } from 'react-native'


function SceneCard () {

  return ( 
    <ScrollView>
      <View>

        <Text> scène </Text>

        <Image source={require('../../assets/SceneImage.png')} />

        <Text> Description: </Text>

        <Text> Adresse: </Text>

        <Text> Date: </Text>

        <Text> Tags: </Text>



      </View>
    </ScrollView>
  )
};

export default SceneCard;