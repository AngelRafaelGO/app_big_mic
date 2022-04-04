import { StyleSheet, Text, FlatList } from 'react-native'
import React from 'react'
import colors from '../../config/colors';
import { Card, FAB, Paragraph, Subheading } from 'react-native-paper';
import { sendEmail } from './../../config/sendemail';


const UserCard = ({route}) => {

  
  const {item} = route.params;
  console.log(item);
  
  return (
  <Card style={styles.sceneCard}>
    <Card.Title title={item.nom + " " + item.prenom} subtitle={item.ville}/>
    <Card.Content>
      <Subheading>Activités</Subheading>
      <FlatList />
      <Text>Liste des cartes valables du compte</Text>
    </Card.Content>
    <Card.Actions>
      <FAB 
      label='Contacter'
      style= {styles.fab}
      icon="email"
      color={colors.white}
      onPress={()=>alert("Envoyer un message à la personne")}
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

export default UserCard;



