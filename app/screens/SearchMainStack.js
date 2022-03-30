import React, { useState } from 'react';
import { SearchSceneScreen, SearchUserScreen, SceneForm } from './screensIndex';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../config/colors';
import {StatusBar, StyleSheet} from 'react-native';
import SceneCard from './cards/SceneCard';
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
          <Tab.Screen name="Search"> 
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Recherche de scène" component={SearchSceneScreen} />
              <Stack.Screen name="Détails" component={SceneCard} />
              <Stack.Screen name="Modification" component={SceneForm} />
            </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Recherche de contact"
            component={SearchUserScreen}
          />
        </Tab.Navigator>
    );
  }


  export default SearchMainStack;