import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './styles';

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import NavigationService from '../../services/navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';


const Edit = ({ navigation }) => {
    
    const [image, setImage] = useState(navigation.getParam('photo_url'));
    const [name, setName] = useState(navigation.getParam('name'));
    const [address, setAddress] = useState(navigation.getParam('address'));

    const goBack = () => {
        NavigationService.navigate('Main');
    }

    const takePicture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(picture => {
            setImage(picture.path);
        });
    }

    const selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(picture => {
            setImage(picture.path);
        });
    }

    const updateFire = async () => {

        const uploadUri = image;

        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Adding 'timestamp' to the file name ( This way we can avoid overwriting some image with equal names)

        const extension = filename.split('.').pop();
        const nameFile = filename.split('.').slice(0, -1).join('.');

        filename = nameFile + Date.now() + '.' + extension;

        // Uploading the image

        const task = storage().ref(`images/${filename}`).putFile(uploadUri);

        try {
            await task;
        } catch (error) {
            console.log(error);
        }

        const ref = storage().ref(`images/${filename}`);
        const photo_url = await ref.getDownloadURL();

        try {
            database().ref(`pupil/${navigation.getParam('key')}`).update({
                name,
                address,
                photo_url
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            setName('');
            setAddress('');
            NavigationService.navigate('Main');
        }
    }

    return (
        <>
            <View style={styles.container}>

                <Image style={styles.imageAvatar} source={{ uri: image }} />

                <View style={styles.photoUpload}>
                    <TouchableOpacity style={styles.photoUploadBtn} onPress={() => takePicture()}>
                        <Icon name="camera-enhance" size={25} color="#FFF" style={{ marginRight: 8 }} />
                        <Text style={styles.text}>Take a picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoUploadBtn} onPress={() => selectImage()}>
                        <Icon name="folder-image" size={25} color="#FFF" style={{ marginRight: 8 }} />
                        <Text style={styles.text}>Select an image</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    onChangeText={name => setName(name)}
                    value={name}
                    style={styles.textInput}
                    placeholder="Name" />

                <View style={{ margin: 8 }} />

                <TextInput
                    onChangeText={address => setAddress(address)}
                    value={address}
                    style={styles.textInput}
                    placeholder="Address" />

                <TouchableOpacity style={styles.button} onPress={() => updateFire()}>
                    <Text style={styles.text} >Atualizar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Edit;