import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import QuestionAnswer from '../screens/Chat/QuestionAnswer';
import PublicChat from '../screens/Chat/PublicChat';
import PrivateChat from '../screens/Chat/PrivateChat';
import { MaterialIcons } from '@expo/vector-icons';


const BottomTabNavigator = createBottomTabNavigator({
    QuestionAnswer: {
        screen: QuestionAnswer,
        navigationOptions: {
            tabBarLabel:'Sorular Ve Cevaplar',
            tabBarIcon: ({ tintColor }) => (<MaterialIcons name="question-answer" size={30} color={tintColor} />),
        },
    },
    PublicChat: {
            
        screen: PublicChat,
        navigationOptions: {
            tabBarLabel:'Herkese Açık Chat',
            tabBarIcon: ({ tintColor }) => (<MaterialIcons name="chat-bubble" size={30} color={tintColor} />),
        }
    },
    PrivateChat: {
        
        screen: PrivateChat,
        navigationOptions: {
            tabBarLabel:'Grup Chat',
            tabBarIcon: ({ tintColor }) => (<MaterialIcons name="chat-bubble-outline" size={30} color={tintColor} />),
        }
    },
},

    {
        initialRouteName: 'QuestionAnswer',
        swipeEnabled: true,
        tabBarPosition: 'top',
        animationEnabled: true,
    })

const AuthTabNavigator = createAppContainer(BottomTabNavigator)

export default AuthTabNavigator;

