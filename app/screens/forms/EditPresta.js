import React, { useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, Dimensions, ScrollView} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import {TextInput, Button} from 'react-native-paper';
import colors from '../../config/colors';
import {AuthContext} from '../../config/context';

//import { routeParams } from '../navigation/routesNavigator';

function EditPresta(props, {navigation}) {

    const data = props.route.params.data;

    const {getData} = React.useContext(AuthContext);
    const currentUsr = getData();
    const { numcompte } = currentUsr[0];
    const { pseudo } = currentUsr[0]

    // const [numcompte, setnumcompte] = useState(data.numcompte)
    const [titreprest, settitreprest] = useState(data.titreprest)
    const [descprest, setdescprest] = useState(data.descprest)
    const [lienprest, setlienprest] = useState(data.lienprest)
    const [numphoto, setnumphoto] = useState(data.numphoto)

    const updateData = (navigation) => {
        setnumphoto('1');
        fetch(`http://64.225.72.25:5000/updatepresta/${data.numprest}`, { 
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({numcompte:numcompte, titreprest:titreprest, descprest:descprest, lienprest:lienprest, numphoto:numphoto})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('PrestaDetails', {data:data})
        })
        .catch(error => console.log("PUT error: " + error))
    }
    


  return (
    <SafeAreaView style = {styles.safeAreaStyle}>
        <ScrollView>
            <Text style = {styles.textInputStyle}>
                {numcompte} - {pseudo}
            </Text>
            <TouchableOpacity 
                style={styles.imgView} 
                onPress={() => Alert.alert("you will be able to change the image here next time")}>
                    <Image source={{ uri: 'https://picsum.photos/400'}} style = {styles.img} />
                    {/* <Image source={{ uri : fichierphoto}} style = {styles.img} /> */}
            </TouchableOpacity>

            <View>
                <TextInput style = {styles.textInputStyle}
                    label = "Titre:"
                    value = {titreprest}
                    mode="outlined"
                    onChangeText = {text => settitreprest(text)}
                />
                <TextInput style = {styles.textInputStyle}
                    label = "Description:"
                    value = {descprest}
                    mode="outlined"
                    multiline
                    minHeight = {80}
                    // numberOfLines={10}
                    onChangeText = {text => setdescprest(text)}
                />
                <TextInput style = {styles.textInputStyle}
                    label = "Site WEB:"
                    value = {lienprest}
                    mode="outlined"
                    onChangeText = {text => setlienprest(text)}
                />
                <View style = {styles.viewStyle}>
                    <Button style = {styles.btnStyle}
                        icon = "check"
                        mode='contained'
                        width= {150}
                        onPress={() => updateData(navigation)}>
                        Modifier
                    </ Button>
                </View>
            </View>
    </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create ({
    safeAreaStyle: {
        marginLeft: 10,
        marginRight: 10,
        
    },
    viewStyle: {
        alignSelf: 'center',
    },
    textInputStyle: {
        fontSize: 15,
        margin: 3,
    },
    btnStyle: {
        margin: 30,
        backgroundColor: '#FF4858'
    },
    imgView: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        // borderWidth: 1,
        backgroundColor: colors.secondary,
        width: Dimensions.get('window').width * 0.92,
        height: 300,
        borderRadius: 4,
    },
    img: {
        height: 260,
        aspectRatio: 1,
        resizeMode: 'stretch',
        // padding: 10,
        marginTop: 8,
    },

})

export default EditPresta;