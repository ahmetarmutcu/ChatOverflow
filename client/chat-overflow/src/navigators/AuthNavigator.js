import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';

const TabNavigator = createMaterialTopTabNavigator({
    Login: {
        screen: Login,
        /*
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Icon name="account-key-outline" size={30} color={tintColor} />),
        }
        */
    },
    SignUp: {
        
        screen: SignUp,
        /*
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (<Icon name="account-plus-outline" size={30} color={tintColor} />),
        }
        */
    },
},

    {
        initialRouteName: 'Login',
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

const AuthTabNavigator = createAppContainer(TabNavigator)

export default AuthTabNavigator;

