import React, { useState } from 'react';
import { SearchSceneScreen, SearchUserScreen } from '../screens/screensindex';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../config/colors';
import {StatusBar} from 'react-native';


const SearchMainStack = () => {
    const Tab = createMaterialTopTabNavigator();
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
          <Tab.Screen
              name="Recherche de scène"
              component={SearchSceneScreen}
            />
            <Tab.Screen
              name="Recherche de contact"
              component={SearchUserScreen}
            />
        </Tab.Navigator>
    );
  }

  export default SearchMainStack;