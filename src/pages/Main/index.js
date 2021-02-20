import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

import styles from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import database from '@react-native-firebase/database';

const Main = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [listPupil, setListPupil] = useState([]);


    const pushFire = () => {
        try {
            database().ref('pupil').push({
                name,
                address
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            setName('');
            setAddress('');
        }
    }

    const editFire = (key) => {
        console.log('Edite: ', key);
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
                        address: item.val().address
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
                        <Image style={styles.avatar} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
                        <View>
                            <Text style={styles.textName} >{item.name}</Text>
                            <Text style={styles.textAddress} >{item.address}</Text>
                        </View>

                        <View style={styles.listUD}>
                            <TouchableOpacity onPress={() => editFire(item.key)}>
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