import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthNavigator from '../navigators/AuthNavigator';
import ChatNavigator from '../navigators/ChatNavigator';
import HomeScreen from '../screens/HomeScreen';
const stackNavigator = createStackNavigator({

    HomeScreen: {
        screen: HomeScreen,
        /*
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Icon name="account-key-outline" size={30} color={tintColor} />),
        }
        */
    },
    AuthNavigator: {
        screen: AuthNavigator,
        /*
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Icon name="account-key-outline" size={30} color={tintColor} />),
        }
        */
    },
    ChatNavigator: {
        
        screen: ChatNavigator,
        /*
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Icon name="account-plus-outline" size={30} color={tintColor} />),
        }
        */
    },
},

    {
        headerMode:'none',
        initialRouteName: 'HomeScreen',
        swipeEnabled: true,
        tabBarPosition: 'top',
        animationEnabled: true,
        tabBarOptions: {
            //showIcon:true,
            pressColor: '#1b4e7d',
            labelStyle: {
                fontSize: 15,
                color: '#1b4e7d',
                fontWeight: 'bold',
            },
            indicatorStyle: {
                backgroundColor: '#1b4e7d',

            },
            tabStyle: {
                height:70,
                elevation:10,
            },
            style: {
                backgroundColor: '#f8f8f8',
            },
        }
    })

const AuthTabNavigator = createAppContainer(stackNavigator)

export default AuthTabNavigator;

