import { View, Text } from 'react-native'
import React from 'react'
import SceneForm from './SceneForm';
import { ScrollView } from 'react-native-web';



const SceneCard = () => {
  return (

  <ScrollView>
    <View>
      <Text> Ma scène </Text>

      <Text style={{fontWeight: 'bold'}}> {sceneTitle} </Text>

      <View >
         <Button title="Modifier" color='red' borderRadius= '20' fontWeight="bold" padding='10' />
      </View>

    </View>

  </ScrollView>

  )
};
export default SceneCard;



