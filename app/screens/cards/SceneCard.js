import React, {useState} from 'react'
import { ScrollView, StyleSheet, Linking } from 'react-native'
import colors from '../../config/colors';
import { Card, FAB, Paragraph, Subheading, IconButton } from 'react-native-paper';


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
      <Card.Title title={item.titrescene} 
      subtitle= {item.datescene}
      right={(props) => <IconButton 
        style={styles.button}
        color={colors.white}
        icon="email" 
        onPress={() => {sendMail()}} />}/>
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

      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

    </Card>
  </ScrollView>

  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    marginRight:10,
  },
  sceneCard: {
    margin: 20,
  },
})

export default SceneCard;