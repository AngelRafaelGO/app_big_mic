import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SearchSceneScreen, SearchUserScreen } from './app/screens/screensindex';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


//
const SearchMainStack = () => {

    const Tab = createMaterialTopTabNavigator();
    
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
              name="Recherche de scène"
              component={SearchSceneScreen}
            />
            <Tab.Screen
              name="Recherche de contact"
              component={SearchUserScreen}
            />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

