import React, { useState, useLayoutEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import {TextInput, Button, Surface, IconButton} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
// import { useLayoutEffect } from 'react/cjs/react.production.min';
import { Dimensions, StatusBar } from 'react-native-web';
import colors from '../../config/colors';

function CreatePresta(props, {navigation}) {
    const [numcompte, setnumcompte] = useState("")
    const [titreprest, settitreprest] = useState("")
    const [descprest, setdescprest] = useState("")
    const [lienprest, setlienprest] = useState("")

    // const [images, setImages] = useState([]);
    const [image, setImage] = useState("");
    
    const pick = async () => {
        
        // const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // if(granted){
        //     console.log('access granted')
        //     let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes:ImagePicker.MediaTypeOptions.Images,
        //     allowsEditing: true,
        //     aspect:[1,1],
        //     quality:1,
        // })
        // } else {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            });
        // }   
        console.log(result);

        if (!result.didCancel){
            setImage(result);
        }
    }

    // useLayoutEffect(() => {
    const handleUpLoad = () => {
        launchImageLibrary({ maxWidth: 500, maxHeight: 500}, (response) => {
            if (response.didCancel){
                return;
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
        <View style = {styles.imgView}>
            <Text> Image :</Text>
            <Image source={{ uri : image.uri}} style = {styles.img} />
        </View>
        <View style = {styles.btnStyle} >
            <Button style = {styles.btnInside}
                icon = "image"
                mode='contained'
                onPress={() => pick()}
                // onPress={() => handleUpLoad()}
                >
                Image
            </ Button>
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
        backgroundColor: '#FF4858',
    },
    imgView: {
        borderStyle: 'solid',
        borderColor: colors.secondary,
        height: 300,
    },
    img: {
        // width: Dimensions.get('window').width * 0.9,
        width: 300,
        height: '100%',
        resizeMode: 'contain',
        padding: 10,
        margin: 10,
    },
});

export default CreatePresta;