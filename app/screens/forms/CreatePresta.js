import React, { useState, useLayoutEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar, TouchableOpacity, RefreshControl} from 'react-native'; 
import {TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../config/colors';
import Pick_image from '../../components/Pick_image';
import { withNavigation } from '@react-navigation/native-stack';

function CreatePresta(props, {navigation}) {
    const [numcompte, setnumcompte] = useState("")
    const [titreprest, settitreprest] = useState("")
    const [descprest, setdescprest] = useState("")
    const [lienprest, setlienprest] = useState("")

    const [image, setImage] = useState("");
    
    const [loading, setLoading] = useState(true); 

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("refresh it")
        wait(2000).then(() => setRefreshing(false))
    })

    const pick = async (navigation) => {
        
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            });

        console.log("ImagePicker returns: " + Object.keys.name);

        if (!result.cancelled){
            setImage(result);
        } else {
            result.uri = '../../assets/No_Image_uploaded.png';
            console.log('cancelled');
            setImage(result);
        }
    }

    const insertData = (navigation) => {
        console.log("image sélectionnée: " + image);

        fetch('http://64.225.72.25:5000/addpresta', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({numcompte:numcompte, titreprest:titreprest, descprest:descprest, lienprest:lienprest})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Profil')
        })
        .catch(error => console.log("POST error: " + error))
    }

  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
    <ScrollView style = {styles.ScrollviewStyle}>
        <TextInput style = {styles.textInputStyle}
            label = "Titre"
            value = {titreprest}
            mode="outlined"
            onChangeText = {text => settitreprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Description"
            value = {descprest}
            mode="outlined"
            multiline
            numberOfLines={5}
            onChangeText = {text => setdescprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Lien"
            value = {lienprest}
            mode="outlined"
            onChangeText = {text => setlienprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Compte"
            value = {numcompte}
            mode="outlined"
            onChangeText = {text => setnumcompte(text)}
        />
        <TouchableOpacity 
            style={styles.imgView} 
            onPress={() => pick()}>
                {/* <Image source={ require('../../assets/No_Image_uploaded.png')} style = {styles.img} /> */}
                <Image source={{ uri : image.uri !== null ? image.uri: '../../assets/No_Image_uploaded.png'}} style = {styles.img} />
        </TouchableOpacity>

        <View style = {styles.btnStyle} >
            <Button style = {styles.btnInside}
                icon = "pencil"
                mode='contained'
                onPress={() => insertData()}>
                Valider
            </ Button>
        </View>
    </ScrollView>
    </SafeAreaView>
  ); 
};

const styles = StyleSheet.create ({
    safeAreaStyle: {
        // flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    ScrollviewStyle: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // // marginTop: 30,
        // padding: 10,
        // width: '100%',
        // height: 500,
    },
    textInputStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        // width: '100%',
        // height: 40,
    },
    btnStyle: {
        margin: 30,
        // height: 60,
        // width: '100%'
        flexDirection:"row",
        justifyContent:"space-around",
        // margin: 10,
        // padding: 5,
    },
    btnInside: {
        backgroundColor: colors.primary,
    },
    imgView: {
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        backgroundColor: colors.secondary,
        height: 300,
        borderRadius: 5,
    },
    img: {
        // width: Dimensions.get('window').width * 0.8,
        height: 260,
        aspectRatio: 1,
        resizeMode: 'stretch',
        // padding: 10,
        marginTop: 8,
    },
});

export default CreatePresta;