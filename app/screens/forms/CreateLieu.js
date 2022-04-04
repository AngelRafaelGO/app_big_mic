import React, { useState, useLayoutEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar} from 'react-native';
import {TextInput, Button, Surface, IconButton} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

import colors from '../../config/colors';

function CreatePresta(props, {navigation}) {


  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
    <ScrollView style = {styles.ScrollviewStyle}>
        <TextInput style = {styles.textInputStyle}
            label = "Nom de l'établissement"
            //value = {titreprest}
            mode="outlined"
            //onChangeText = {text => settitreprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Description"
            //value = {descprest}
            mode="outlined"
            multiline
            numberOfLines={5}
            //onChangeText = {text => setdescprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Adresse"
            //value = {lienprest}
            mode="outlined"
            //onChangeText = {text => setlienprest(text)}
        />
        <TextInput style = {styles.textInputStyle}
            label = "Contraintes"
            //value = {numcompte}
            mode="outlined"
            //onChangeText = {text => setnumcompte(text)}
        />
        <View style = {styles.imgView}>
            <Text> Image :</Text>
            {/* <Image source={{ uri : image.uri}} style = {styles.img} /> */}
        </View>
        <View style = {styles.btnStyle} >
            <Button style = {styles.btnInside}
                icon = "image"
                mode='contained'
                //onPress={() => pick()}
                >
                Image
            </ Button>
            <Button style = {styles.btnInside}
                icon = "pencil"
                mode='contained'
                //onPress={() => insertData()}
                >
                Valider
            </ Button>
        </View>
    </ScrollView>
    </SafeAreaView>
  ); 
};

const styles = StyleSheet.create ({
    safeAreaStyle: {
        paddingTop: StatusBar.currentHeight,
    },
    ScrollviewStyle: {
    },
    textInputStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
    },
    btnStyle: {
        margin: 30,
        flexDirection:"row",
        justifyContent:"space-around",
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
        width: 300,
        height: '100%',
        resizeMode: 'contain',
        padding: 10,
        margin: 10,
    },
});

export default CreatePresta;