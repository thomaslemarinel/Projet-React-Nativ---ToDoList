import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TokenContext } from '../Context/Context';
import HomeScreen from '../Screen/HomeScreen';
import TodoListsScreen from '../Screen/TodoListsScreen';
import SignInScreen from '../Screen/SignInScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import SignOutScreen from '../Screen/SignOutScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

export default function Navigation () {
  const [token, setToken] = useContext(TokenContext)
  return (
        <NavigationContainer>
          {token == null ? (
            <Tab.Navigator>
              <Tab.Screen name='Se connecter' component={SignInScreen} />
              <Tab.Screen name="S'inscrire" component={SignUpScreen} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name='Accueil' component={HomeScreen} />
              <Tab.Screen name='Liste des tâches' component={TodoListsScreen} />
              <Tab.Screen name='Se déconnecter' component={SignOutScreen} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
  )
}


