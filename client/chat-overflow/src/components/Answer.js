import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Alert } from 'react-native';
import Axios from 'axios';
import { DeviceWidth, DeviceHeight } from '../../Device/index';
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import AppStore from '../store/AppStore'
//import { ScrollView, TextInput } from 'react-native-gesture-handler';

function Answer(props) {
    //console.log(props.deneme)


    return (
        <View style={styles.container}>
            <Text>{props.text}</Text>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        margin:10,
        borderRadius: 10,
        borderColor: '#f1f1f1',
        backgroundColor:'#f8f8f8',
        borderWidth: 5,
        width: DeviceWidth - 60,
        height:50,
    }
});

export default Answer  