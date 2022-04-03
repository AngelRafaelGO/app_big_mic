import React, {useState, useEffect} from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Paragraph } from "react-native-paper";
import { Subheading } from "react-native-paper";
import { Card } from "react-native-paper";
import { render } from "react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod";

const PrestaCard = ({route}) =>{

    const {props} = route.params;
    console.log(props);

    render(

        <ScrollView style = {styles.container}>
            <Card>
                <Card.Title 
                title={props.titreprest} 
                />
                <Card.Content>
                    <Subheading>Description</Subheading>
                    <Paragraph>
                        {props.descprest}
                    </Paragraph>
                    <Subheading>Lien</Subheading>
                    <Paragraph>
                        {props.lienprest}
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
