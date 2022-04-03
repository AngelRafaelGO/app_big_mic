import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Paragraph, Subheading, Card } from "react-native-paper";

const PrestaCard = ({route}) =>{

    const {prestas} = route.params;
    console.log(prestas);

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
                    <Paragraph>
                        {prestas.lienprest}
                    </Paragraph>
                </Card.Content>
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
