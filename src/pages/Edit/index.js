import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './styles';

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import NavigationService from '../../services/navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';


const Edit = ({ navigation }) => {

    const currentImage = navigation.getParam('photo_url');

    const [image, setImage] = useState(navigation.getParam('photo_url'));
    const [name, setName] = useState(navigation.getParam('name'));
    const [address, setAddress] = useState(navigation.getParam('address'));

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

        let filename = '';
        let photo_url = '';

        if (((name.trim() === '') || (address.trim() === ''))) {
            Alert.alert(
                'Incomplete field',
                'All fields must be filled'
            )
        } else {
            if (currentImage !== image) {

                const uploadUri = image;

                filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

                const extension = filename.split('.').pop();
                const nameFile = filename.split('.').slice(0, -1).join('.');

                filename = nameFile + Date.now() + '.' + extension;

                const task = storage().ref(`images/${filename}`).putFile(uploadUri);

                try {
                    await task;
                } catch (error) {
                    console.log(error);
                }

                const ref = storage().ref(`images/${filename}`);
                photo_url = await ref.getDownloadURL();

            } else {

                photo_url = currentImage;

            }

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
    }

    const goBack = () => {
        NavigationService.navigate('Main');
    }

    return (
        <>
            <View style={styles.backContainer}>
                <Icon name="keyboard-backspace" size={40} color="#000" style={{ margin: 16 }} onPress={() => goBack()} />
                <Text style={styles.backText}>Edit</Text>
            </View>

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
                    <Text style={styles.text} >Update</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Edit;