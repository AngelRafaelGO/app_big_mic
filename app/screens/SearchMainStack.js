import React, { useState } from 'react';
import { SearchSceneScreen, SearchUserScreen } from './screensIndex';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../config/colors';
import {StatusBar} from 'react-native';
import {SceneCard, UserCard}from './screensIndex';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const SearchMainStack = () => {
    const Tab = createMaterialTopTabNavigator();
    const Stack = createNativeStackNavigator();
    //Set status bar color to light mode
    StatusBar.setBarStyle( 'light-content',true)

    return (
        <Tab.Navigator 
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, color: colors.light },
          tabBarStyle: { backgroundColor: colors.dark, paddingTop: 25 },
          tabBarIndicatorStyle: {backgroundColor: colors.primary}
        }}
        >
          <Tab.Screen name="Search Scene"> 
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Recherche de scène" component={SearchSceneScreen} />
              <Stack.Screen name="Détails" component={SceneCard} />
            </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Search user"
          >
            {() => (
            <Stack.Navigator>
              <Stack.Screen name="Recherche d'utilisateur'" component={SearchUserScreen} />
              <Stack.Screen name="Détails compte" component={UserCard} />
            </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
    );
  }


  export default SearchMainStack;