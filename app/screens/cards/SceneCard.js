import React, {useState} from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import colors from '../../config/colors';
import { Card, FAB, Paragraph, Subheading } from 'react-native-paper';




const SceneCard = ( {route}) => {

  const {item} = route.params;
  console.log(item);
  
  return (
  <ScrollView>
    <Card style={styles.sceneCard}>
      <Card.Title title={item.titrescene} subtitle= {item.datescene}/>
      <Card.Content>
        <Subheading>Description</Subheading>
        <Paragraph>{item.descscene}</Paragraph>
        <Subheading>Critères</Subheading>
        <Paragraph>{item.criteres}</Paragraph>
        <Subheading>Adresse</Subheading>
        <Paragraph>{item.adrscene}</Paragraph>

      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <FAB 
        label='Contacter'
        style= {styles.fab}
        icon="email"
        color={colors.white}
        onPress={()=>alert("Envoyer un message à l'organisateur")}
          />
      </Card.Actions>


    </Card>
  </ScrollView>

  )
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.primary,
  },
  sceneCard: {
    margin: 20,
  },
})

export default SceneCard;