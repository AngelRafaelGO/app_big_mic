import { Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../config/colors';
import { Card, FAB, Title, Paragraph, Subheading } from 'react-native-paper';



const SceneCard = ( {route}) => {
  
  const {item} = route.params;
  
  return (
  <Card style={styles.sceneCard}>
    <Card.Title title={item.titrescene} />
    <Card.Content>
      <Subheading>Description</Subheading>
      <Paragraph>{item.descscene}</Paragraph>
      <Subheading>Critères</Subheading>
      <Paragraph>{item.criteres}</Paragraph>

    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <FAB 
      label='Contacter'
      style= {styles.fab}
      icon="email"
      color={colors.white}
      onPress={()=>alert("Envoyer une message à l'organisateur")}
        />
    </Card.Actions>


  </Card>

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



