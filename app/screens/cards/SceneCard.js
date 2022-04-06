import React, {useState} from 'react'
import { ScrollView, StyleSheet, Linking } from 'react-native'
import colors from '../../config/colors';
import { Card, FAB, Paragraph, Subheading } from 'react-native-paper';
import { Link } from '@react-navigation/native';




const SceneCard = ( {route}) => {

  const {item} = route.params;
  console.log(item);
  
  const sendMail = () => {
    fetch(`http://64.225.72.25:5000/getcompte/${item.numcompte}`, {
      method : 'GET'
    })
    .then(resp => resp.json())
    .then(contact => {
      if(contact.mail != ''){
        const message = 'mailto:' + contact.mail + '?subject=' + item.titrescene + '&body='+'Bonjour ' +  contact.pseudo ;
        // console.log(message);
        Linking.openURL(message);
      } else {
        Alert.alert("pas d'adresse email définie")
      }
    }
    )
    .catch(error => console.log("No mail sent :\n" + error))
  }
  
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
      <Card.Actions>
        <FAB 
        label='Contacter'
        style= {styles.fab}
        icon="email"
        color={colors.white}
        onPress={()=> sendMail()}
          />
      </Card.Actions>

      {/* <Text style={styles.txtlien}
                    onPress={() => Linking.openURL(data.lienprest.toString())}>
                    {data.lienprest}
                </Text> */}


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