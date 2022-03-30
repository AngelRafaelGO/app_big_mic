import React, { useState, useLayoutEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import {TextInput, Button, Surface, IconButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
// import { useLayoutEffect } from 'react/cjs/react.production.min';
import { Dimensions } from 'react-native-web';
import colors from '../../config/colors';

function CreatePresta(props, {navigation}) {
    const [numcompte, setnumcompte] = useState("")
    const [titreprest, settitreprest] = useState("")
    const [descprest, setdescprest] = useState("")
    const [lienprest, setlienprest] = useState("")

    // const [images, setImages] = useState([]);
    const [image, setImage] = useState([]);

    // useLayoutEffect(() => {
    const handleUpLoad = () => {
        ImagePicker.showImagePicker({ maxWidth: 500, maxHeight: 500}, (response) => {
            if (response.didCancel){
                return '../../assets/No_Image_uploaded.png';
            }
            const img = {
                uri: response.uri,
                type: response.type,
                name:
                    response.fileName ||
                    response.uri.substr(response.uri.lastIndexOf('/') +1),
            };
            setImage(img);
            // setImages(prevImages => prevImages.concat(img));
        });
    };
    
    


    // navigation.setOptions({
    //     headerRight: () => <IconButton icon="plus" onPress={handleUpLoad} />
    // });
    // }, [navigation]);


    const insertData = (navigation) => {
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
    <ScrollView style = {styles.viewStyle}>
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
            numberOfLines={10}
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
        <View>
            <Image source={{ uri : image.uri}} style = {styles.img} />
        </View>
        <Button style = {styles.btnStyle}
            icon = "plus"
            mode='contained'
            onPress={() => handleUpLoad()}
            >
            Insérer une Image
        </ Button>
        <Button style = {styles.btnStyle}
            icon = "pencil"
            mode='contained'
            onPress={() => insertData()}>
            Insérer une Prestation
        </ Button>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create ({
    safeAreaStyle: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '100%',
    },
    viewStyle: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // // marginTop: 30,
        // padding: 10,
        // width: '100%',
        // height: '100%',
    },
    textInputStyle: {
        margin: 10,
        // width: '100%',
        // height: 40,
    },
    btnStyle: {
        margin: 30,
        backgroundColor: '#FF4858'
        // height: 60,
        // width: '100%'
    },
    img: {
        width: Dimensions.get('window').width * 0.9,
        height: '100%',
        resizeMode: 'contain',
        padding: 10,
        margin: 10,
        borderStyle: 'solid',
        borderColor: colors.secondary,
    },
});

export default CreatePresta;