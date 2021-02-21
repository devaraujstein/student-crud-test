import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

import styles from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import NavigationService from '../../services/navigation';
import ImagePicker from 'react-native-image-crop-picker';

const Main = () => {

    const [image, setImage] = useState('https://reactnative.dev/img/tiny_logo.png');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [listPupil, setListPupil] = useState([]);

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

    const pushFire = async () => {

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
            database().ref('pupil').push({
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
            setImage('https://reactnative.dev/img/tiny_logo.png');
        }
    }

    const editFire = (key, name, address, photo_url) => {
        NavigationService.navigate('Edit', {
            key,
            name,
            address,
            photo_url
        });
    }

    const deleteFire = (key) => {
        try{
            database().ref(`pupil/${key}`).remove();
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            database().ref('pupil').on('value', snapshot => {
                const list = [];

                snapshot.forEach(item => {
                    list.push({
                        key: item.key,
                        name: item.val().name,
                        address: item.val().address,
                        photo_url: item.val().photo_url
                    });
                });
                setListPupil(list);
            });
        }catch(error){
            console.log(error);
        }
    }, []);

    return (
        <>
            <View style={styles.container}>

                <Image style={styles.imageAvatar} source={{uri: image}} />

                <View style={styles.photoUpload}>
                    <TouchableOpacity style={styles.photoUploadBtn} onPress={() => takePicture()}>
                        <Icon name="camera-enhance" size={25} color="#FFF" style={{marginRight: 8}}/>
                        <Text style={styles.text}>Take a picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoUploadBtn} onPress={() => selectImage()}>
                        <Icon name="folder-image" size={25} color="#FFF" style={{marginRight: 8}} />
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

                <TouchableOpacity style={styles.button} onPress={pushFire}>
                    <Text style={styles.text} >Cadastrar Aluno</Text>
                </TouchableOpacity>

                <View style={{ margin: 8 }} />

                <FlatList 
                    data={listPupil}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => 

                    <View style={styles.listContainer}>
                        <Image style={styles.avatar} source={{uri: item.photo_url}} />
                        <View>
                            <Text style={styles.textName} >{item.name}</Text>
                            <Text style={styles.textAddress} >{item.address}</Text>
                        </View>

                        <View style={styles.listUD}>
                            <TouchableOpacity onPress={() => editFire(item.key, item.name, item.address, item.photo_url)}>
                                <Icon name="account-edit" size={40} color="#6BA0FC" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteFire(item.key)}>
                                <Icon name="delete-forever" size={40} color="#f44336" />
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    }
                />

            </View>
        </>
    )
}

export default Main;