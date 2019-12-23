import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Axios from 'axios';
import AppStore from '../../store/AppStore';
import User from '../../components/User';

export default class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  _fetch = async() => {
    AppStore.setLoading(true)
    await Axios.get('https://chatsauuu.herokuapp.com/user/get').then(async (response) => {
      //console.log(response.data)
      if (response.data.status == 200) {
        console.log(response.data.data)
        //console.log(typeof JSON.parse(response.data.data))

        await this.setState({
          users: response.data.data
        })
      }
    })

      .catch((err) => {
        console.log('Erreur : ' + err)
      })
    AppStore.setLoading(false)
  }
  componentDidMount = async () => {
    AppStore.setLoading(true)
    AppStore.io.on('signup', async (data) => {
      this._fetch()
    })
    await this._fetch()

    AppStore.setLoading(false)
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          {
            Object.keys(this.state.users).map((item, index) => {
              return (
                <User key={index} uid={item} mail={this.state.users[item].mail} />
              )
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
  }
});
