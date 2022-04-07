import React, {useEffect, useState} from "react";
import { StyleSheet, ScrollView, Linking } from "react-native";
import { Paragraph, Subheading, Card } from "react-native-paper";

const PrestaCard = ({route}) =>{

    //Fetch photo
    const [lienfichierphoto, setlienFichierphoto] = useState('https://picsum.photos/700');

    const getphoto = () => {
        console.log('numphoto:' + prestas.numphoto)
        fetch(`http://188.166.40.140:5000/getphoto/${prestas.numphoto}`, {
            method : 'GET',
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.numphoto != null || resp.fichierphoto !='' || resp.fichierphoto != 'undefined'){
                console.log("il y a une photo " + resp.numphoto + " - "+ resp.fichierphoto);
                setlienFichierphoto(resp.fichierphoto);
            }
        })
        .catch(error => {
            console.log("DELETE error: " + error)
            alert
        })
    };

    useEffect(() =>{ 
        getphoto();
        if (prestas.numphoto == null){
            setlienFichierphoto('https://picsum.photos/700');
            console.log("fichier: " + lienfichierphoto);
        }
      }, []);

    const {prestas} = route.params;
    console.log("Prestas :" +prestas);

    return(

        <ScrollView style = {styles.container}>
            <Card>
                <Card.Title 
                title={prestas.titreprest} 
                />
                <Card.Content>
                    <Subheading>Description</Subheading>
                    <Paragraph>
                        {prestas.descprest}
                    </Paragraph>
                    <Subheading>Lien</Subheading>
                    <Paragraph onPress={() => {if(prestas.lienprest){Linking.openURL(prestas.lienprest.toString())}}}>
                        {prestas.lienprest}
                    </Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: lienfichierphoto}} />
            </Card>
        </ScrollView>
        )
    };

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
})

export default PrestaCard;
