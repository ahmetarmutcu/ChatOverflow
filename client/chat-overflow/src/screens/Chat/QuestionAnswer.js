import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, Text, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import Axios from 'axios';
import AppStore from '../../store/AppStore';
import Question from '../../components/Question';
import { DeviceWidth, DeviceHeight } from '../../../Device/index';
import { observer } from 'mobx-react';

@observer
export default class QuestionAnswer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      head: '',
      text: '',
    }
  }
  componentDidMount = async () => {
    AppStore.setLoading(true)
    await AppStore.io.on('question', async (data) => {
      AppStore.setQuestion()
    })
    await AppStore.setLoading(false)
  }

  render() {
    //console.log(this.state.questions)
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }} onPress={() => {
          this.setState({
            loading: true
          })
        }}>
          <Text style={styles.text}>SORU OLUSTUR</Text>
          <Modal transparent={true} animationType={'none'} visible={this.state.loading}>
            <KeyboardAvoidingView style={styles.modalBackground} behavior='padding' enabled>
              <View style={styles.detail}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text}>BASLIK</Text>
                  <TextInput
                    placeholder='  Baslik'
                    placeholderTextColor='#ccc'
                    autoCapitalize='none'
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    style={styles.input}
                    value={this.state.head}
                    onChangeText={(str) => { this.setState({ head: str }) }}
                  />
                  <Text style={styles.text}>ICERIK</Text>
                  <TextInput
                    placeholder='  Icerik'
                    placeholderTextColor='#ccc'
                    autoCapitalize='none'
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    style={styles.input}
                    value={this.state.text}
                    onChangeText={(str) => { this.setState({ text: str }) }}
                  />
                  <TouchableOpacity onPress={async () => {
                    await AppStore.setLoading(true)

                    await Axios.post('https://chatsauuu.herokuapp.com/question/create', {
                      'uid': AppStore.uid,
                      'questionHeader': this.state.head,
                      'questionText': this.state.text,
                    }).then(async (response) => {
                      console.log(response.data)
                      if (response.data.status == 200) {
                        const data = "yeni soru olusturuldu."
                        await AppStore.io.emit('question', (data));
                        Alert.alert(response.data.message)
                      } else {
                        Alert.alert(response.data.message)
                      }
                    })
                      .catch((err) => {
                        console.log('Erreur : ' + err)
                      })
                    await this.setState({ head: '', text: '' })
                    await AppStore.setLoading(false)
                    await this.setState({
                      loading: false
                    })

                  }}>
                    <Text style={[styles.text, { color: 'green' }]}>Submit</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={async () => {
                  await this.setState({ head: '', text: '' })
                  await this.setState({
                    loading: false
                  })
                }}>
                  <Text style={[styles.text]}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </TouchableOpacity>

        <View style={styles.subContainer}>
          {

            AppStore.keys.map((item, index) => {
              const questionKeys = Object.keys(AppStore.questions[item])
              return (
                questionKeys.map((item2, index2) => {
                  console.log(AppStore.questions[item][item2].answers)
                  if (AppStore.questions[item][item2].answers != null) {
                    return (
                      <Question key={index2} answers={AppStore.questions[item][item2].answers} text={AppStore.questions[item][item2].text} head={AppStore.questions[item][item2].head} uid={item} questionId={AppStore.questions[item][item2].questionId} />
                    )
                  } else {
                    return (
                      <Question key={index2} answers={[]} text={AppStore.questions[item][item2].text} head={AppStore.questions[item][item2].head} uid={item} questionId={AppStore.questions[item][item2].questionId} />
                    )
                  }

                }
                ))
            })
          }
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    //justifyContent: 'center',
    //backgroundColor: '#f5f5f5',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000040'
  },
  detail: {
    justifyContent: 'center',
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
