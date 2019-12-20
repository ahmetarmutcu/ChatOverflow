import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import Axios from 'axios';
import { DeviceWidth, DeviceHeight } from '../../Device/index';
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import AppStore from '../store/AppStore'
//import { ScrollView, TextInput } from 'react-native-gesture-handler';

function Answer(props) {
    //console.log(props.deneme)

    const [isLoading, setLoading] = useState(false)
    const [message, setMessage] = useState([])
    const [sMessage, sSetMessage] = useState('')
    useEffect(() => {
        AppStore.io.on('message', async (mess) => {
            console.log(mess)
            if (mess.id == (AppStore.uid + props.uid) || mess.id == (props.uid + AppStore.uid)) {
                await setMessage(oldArray => [...oldArray, mess.mess])
            }
        })
    }, []);

    function _sendMessage() {
        const data = {
            'id': AppStore.uid + props.uid,
            'mess': sMessage
        }
        AppStore.io.emit('message', data);
    }

    return (
        <View>

            <Modal transparent={true} animationType={'none'} visible={isLoading}>
                <KeyboardAvoidingView style={styles.modalBackground} behavior='height' enabled>
                    <View style={styles.detail}>

                        
                        <View>
                            {
                                message.map((item, index) => {
                                    return (
                                        <Text style={styles.text} key={index}>{item}</Text>
                                    )
                                })
                            }
                        </View>
                        <View>
                            <TextInput
                                placeholder='  Chat Chat Chat'
                                placeholderTextColor='#ccc'
                                autoCapitalize='none'
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                style={styles.input}
                                value={sMessage}
                                onChangeText={(str) => { sSetMessage(str) }}
                            />
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={async () => {
                                await AppStore.setLoading(true)
                                await _sendMessage()
                                sSetMessage('')
                                await AppStore.setLoading(false)
                            }}>
                                <Text style={[styles.text, { color: 'green' }]}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={async () => {
                            setLoading(false)
                            setMessage([])
                        }}>
                            <Text style={[styles.text]}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </Modal>

            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    setLoading(true)
                }}>
                    <Text style={styles.text}>{props.mail}</Text>
                </TouchableOpacity>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 10,
        borderColor: '#f1f1f1',
        backgroundColor: '#f8f8f8',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: DeviceWidth - 60,
        height: 50,
    },
    text: {
        fontSize: 22,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    detail: {
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        height: DeviceHeight - 100,
        width: DeviceWidth - 40,

    },
    input: {
        height: 100,
        width: DeviceWidth - 60,
        padding: 5,
        marginRight: 10,
        marginLeft: 10,
        borderWidth: 2,
        borderRadius: 4,
        margin: 10,
        borderColor: '#f5f5f5',
        fontSize: 16,
        backgroundColor: '#f8f8f8',
        fontWeight: '600',
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * 8 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 8,
    },
});

export default Answer  