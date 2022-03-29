import { View, Text , ScrollView} from 'react-native'
import React from 'react'


const SceneCard = () => {
  return (

  <ScrollView>
    <View>
      <Text> Ma scène </Text>

      <Text style={{fontWeight: 'bold'}}> {SceneForm.sceneTitle} </Text>

      <View >
         <Button title="Modifier" color='red' borderRadius= '20' fontWeight="bold" padding='10' />
      </View>

    </View>

  </ScrollView>

  )
};
export default SceneCard;



