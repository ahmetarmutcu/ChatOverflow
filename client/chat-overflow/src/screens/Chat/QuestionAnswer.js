import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Axios from 'axios';
import AppStore from '../../store/AppStore';
import Question from '../../components/Question';

export default class QuestionAnswer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keys: [],
      questions: [],
    }
  }

  componentDidMount = async () => {
    AppStore.setLoading(true)

    await Axios.get('http://192.168.43.75:8080/question/questions').then(async (response) => {
      //console.log(response.data)
      if (response.data.status == 200) {
        //console.log(response.data.data[0])
        //console.log(typeof JSON.parse(response.data.data))

        await this.setState({
          keys: Object.keys(response.data.data),
          questions: response.data.data,
        })
      }
    })

      .catch((err) => {
        console.log('Erreur : ' + err)
      })

    AppStore.setLoading(false)
  }

  render() {
    //console.log(this.state.questions)
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          {
            this.state.keys.map((item, index) => {
              const questionKeys = Object.keys(this.state.questions[item])
              return (
                questionKeys.map((item2, index2) => {
                  console.log(this.state.questions[item][item2].answers)
                  return (
                    <Question key={index2} answers={this.state.questions[item][item2].answers} text={this.state.questions[item][item2].text} head={this.state.questions[item][item2].head} uid={item} questionId={this.state.questions[item][item2].questionId} />
                  )
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
  subContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});
