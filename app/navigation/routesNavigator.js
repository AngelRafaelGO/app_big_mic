import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Presta, CreatePresta } from '../screens/screensIndex';

// Here we create objects to pass as parameters between screens
export let routeParams = {
    CreatePresta: undefined,
    Presta: undefined,
};

const Stack = createNativeStackNavigator ();

export function RootNavigator() {
    return (
        <Stack.Navigator>
        <Stack.Screen 
            name="Créer une Prestation" component={CreatePresta} />
        <Stack.Screen 
            name="Prestation" component={Presta} />
        </Stack.Navigator>
      );
};
