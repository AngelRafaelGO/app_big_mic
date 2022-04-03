import React from 'react';
import { SearchSceneScreen, SearchArtistScreen } from '../screens/screensIndex';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../config/colors';
import {StatusBar} from 'react-native';
import {SceneCard, UserCard}from '../screens/screensIndex';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrestaCard from '../screens/cards/PrestaCard';


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
          <Tab.Screen name="Rechercher une scène"> 
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Recherche de scène" component={SearchSceneScreen}
              options={{ 
                headerShown: false
             }} />
              <Stack.Screen name="Détails" component={SceneCard} />
            </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Rechercher un artiste"
          >
            {() => (
            <Stack.Navigator>
              <Stack.Screen name="Recherche d'artiste" component={SearchArtistScreen}
              options={{ 
                headerShown: false
             }} />

              <Stack.Screen name="Détails compte" component={UserCard} />
              {/* <Stack.Screen name="Détails de la prestation" component={PrestaCard} /> */}
            </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
    );
  }

  export default SearchMainStack;