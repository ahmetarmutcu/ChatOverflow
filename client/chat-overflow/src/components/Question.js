import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Alert } from 'react-native';
import Axios from 'axios';
import { DeviceWidth, DeviceHeight } from '../../Device/index';
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import AppStore from '../store/AppStore'
import Answer from './Answer'
//import { ScrollView, TextInput } from 'react-native-gesture-handler';

function Question(props) {
    //console.log(props.deneme)
    const [isLoading, setLoading] = useState(false)
    const [answer, setAnswer] = useState('')

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            setLoading(true)
        }}>
            <Modal transparent={true} animationType={'none'} visible={isLoading}>
                <View style={styles.modalBackground}>
                    <View style={styles.detail}>
                        <View style={styles.head}>
                            <Text style={[styles.text, { marginBottom: 15, }]}>{props.head}</Text>
                            <View style={styles.hr}></View>
                            <Text style={[styles.text, { margin: 10, }]}>{props.text}</Text>
                            <View style={styles.hr2}></View>
                            <ScrollView style={styles.scroll}>
                                {Object.keys(props.answers).map((item, index) => {
                                    //const answersKeys = Object.keys(props.answers[item])
                                    //return (

                                        //answersKeys.map((item2, index2) => {
                                            //console.log(this.state.questions[item][item2].answers)
                                            return (
                                                <Answer key={index} text={props.answers[item].text} />
                                            )
                                        //}
                                        //))
                                })}
                            </ScrollView>
                        </View>

                        <View style={styles.close}>
                            <TextInput
                                placeholder='  Answer'
                                placeholderTextColor='#ccc'
                                autoCapitalize='none'
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                                style={styles.input}
                                value={answer}
                                onChangeText={(str) => { setAnswer(str) }}
                            />

                            <TouchableOpacity onPress={async () => {
                                await AppStore.setLoading(true)

                                await Axios.post('http://192.168.43.75:8080/answer/create', {
                                    'uid': AppStore.uid,
                                    'ownerUid': props.uid,
                                    'questionId': props.questionId,
                                    'answerText': answer,
                                }).then(response => {
                                    console.log(response.data)
                                    if (response.data.status == 200) {
                                        Alert.alert(response.data.message)
                                    } else {
                                        Alert.alert(response.data.message)
                                    }
                                })
                                    .catch((err) => {
                                        console.log('Erreur : ' + err)
                                    })
                                await setAnswer('')
                                await AppStore.setLoading(false)
                            }}>
                                <Text style={[styles.text, { color: 'green' }]}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setAnswer('')
                                setLoading(false)
                            }}>
                                <Text style={[styles.text]}>Close</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
            <IconCommunity
                name={"comment-question-outline"}
                color="#1b4e7d"
                size={35}
            />
            <Text style={styles.text}>{props.head}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#f8f8f8',
        borderWidth: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: DeviceWidth - 10,
        //backgroundColor: '#F5FCFF',
        backgroundColor: '#f8f8f8',
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * 8 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 8,
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
    close: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'column',
    },
    head: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    hr: {
        width: DeviceWidth - 40,
        height: 2,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * 8 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 8,
        borderColor: '#f8f8f8',
        borderWidth: 3,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hr2: {
        width: DeviceWidth - 40,
        height: 2,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * 8 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 8,
        borderColor: '#f8f8f8',
        borderWidth: 1,
    },
    scroll:{
        height:180,
    }
});

export default Question  