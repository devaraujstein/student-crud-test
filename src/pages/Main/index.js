import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

import database from '@react-native-firebase/database';

const Main = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const pushFire = () => {
        try {
            database().ref('pupil').push({
                name,
                address
            });
        } catch (error) {
            console.log(error);
        }
        finally{
            setName('');
            setAddress('');
        }
    }

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
            </View>
        </>
    )
}

export default Main;