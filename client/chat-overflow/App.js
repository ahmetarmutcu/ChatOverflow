import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, SafeAreaView, KeyboardAvoidingView, Modal, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStore from './src/store/AppStore';
import {observer} from 'mobx-react';
import Router from './src/navigators/Router';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){
    
  }
  render() {
    const isLoading = AppStore.loading
    //console.log(isLoading)
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Modal transparent={true} animationType={'none'} visible={isLoading}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={isLoading} />
            </View>
          </View>
        </Modal>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
            <Router />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }




}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    backgroundColor: '#f5f5f5',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});
