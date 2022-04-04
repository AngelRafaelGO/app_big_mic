import React from 'react'
import * as ImagePicker from 'expo-image-picker';

async function Pick_image () {
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    });

    console.log("from pick ", result);

    if (result.cancelled){
        result.uri = '../../assets/No_Image_uploaded.png';
        console.log('cancelled');
    }
    return result;
}

export default Pick_image;