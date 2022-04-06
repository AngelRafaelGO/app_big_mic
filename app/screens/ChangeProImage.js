import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';

function ChangeProImage({ navigation }) {

    const [image, setImage] = useState(null);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
      
    };
  
    return (
        <View style={styles.changeMainView}>
            <TouchableOpacity
            style={styles.changeITouchable}
            onPress={pickImage}
            >
                <Text style={styles.changeTxt}>
                    Séléctioner une image
                </Text>
                </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                <TouchableOpacity
                style={styles.changeITouchable}
                onPress={() => navigation.navigate('Profil', { image:image })}
                >
                    <Text style={styles.changeTxt}>
                        Valider
                    </Text>
            </TouchableOpacity>
        </View>
    );
  };

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200,
    },
    changeITouchable: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%' ,
        height: 40, 
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginTop: 40,
    },
    changeMainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeTxt: {
        color: colors.white,
    },
})

export default ChangeProImage;