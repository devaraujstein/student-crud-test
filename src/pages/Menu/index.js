import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import NavigationService from '../../services/navigation';

import styles from './styles';

const Menu = () => {

    const acessCrud = () => {
        NavigationService.navigate('Main');
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={acessCrud}>
                    <Text style={styles.text} >Acessar Alunos</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Menu;