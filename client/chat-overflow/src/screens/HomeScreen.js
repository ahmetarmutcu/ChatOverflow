import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: 310, height: 240, marginTop: '20%' }} source={require('../../assets/images/chatLogo.png')}></Image>
                <Text style={{ fontSize: 18, textAlign: "center", marginTop: 30, color: 'gray' }}>
                    Chat-Overflow ile Cevaplar bilgiye ulaşmanın ve paylaşmanın yeni adresidir. İstediğiniz konuda soru sorabilir, gerçek insanlardan cevaplar alabilirsiniz.
                </Text>
                <View style={styles.submit}>
                    <TouchableOpacity style={{ height: 65 }} onPress={() => this.props.navigation.navigate('AuthNavigator')}>
                        <Text style={styles.button}>HOŞGELDİNİZ</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center",
      flex: 1,
      flexDirection: "column"
    },
    button: {
      height: 55,
      width: 150,
      padding: 5,
      margin: 5,
      borderWidth: 2,
      borderRadius: 25,
      borderColor: '#f5f5f5',
      fontSize: 18,
      fontWeight: '600',
      backgroundColor: '#FF7F00',
      color: 'black',
      textAlign: 'center',
      textAlignVertical: 'center',
      elevation: 8,
      shadowColor: 'gray',
          shadowOffset: { width: 0, height: 0.5 * 8 },
          shadowOpacity: 0.3,
          shadowRadius: 0.8 * 8,
    },
    submit: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },});