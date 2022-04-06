import React , {useState} from 'react';
import { SearchSceneScreen, SearchArtistScreen } from '../screens/screensIndex';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../config/colors';
import {StatusBar} from 'react-native';
import {SceneCard, UserCard}from '../screens/screensIndex';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrestaCard from '../screens/cards/PrestaCard';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


const SearchMainStack = () => {
    const Tab = createMaterialTopTabNavigator();
    const Stack = createNativeStackNavigator();
    //Set status bar color to light mode
    StatusBar.setBarStyle( 'light-content',true)

    return (
        <Tab.Navigator 
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, color: colors.dark, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: colors.primary, paddingTop: 25 },
          tabBarIndicatorStyle: {backgroundColor: colors.dark},
        }}
        >
          <Tab.Screen name="Une scène"
           options={{
            tabBarIcon: () => (
              <FontAwesome5 name="search-location" size={24} color={colors.dark} />
            ),
        }}> 
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Recherche de scène" component={SearchSceneScreen}
              options={{ 
                headerShown: false
             }} />
              <Stack.Screen name="Détails" component={SceneCard}
               />
            </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Un artiste"
            options={{
              tabBarIcon: () => (
                <MaterialIcons name="person-search" size={24} color={colors.dark} />
              ),
          }}
          >
            {() => (
            <Stack.Navigator>
              <Stack.Screen name="Recherche d'artiste" component={SearchArtistScreen}
               />
              <Stack.Screen name="Détails compte" component={UserCard}
               />
              <Stack.Screen name="Détails de la prestation" component={PrestaCard}
              />
            </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
    );
  }

  export default SearchMainStack;