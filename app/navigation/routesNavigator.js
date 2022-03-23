import react from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, CreateAccount } from '../screens/screensIndex';

// Here we create objects to pass as parameters between screens
export let routeParams = {
    LoginScreen: undefined,
    CreateAccount: undefined,
};

const Stack = createNativeStackNavigator ();

export function RootNavigator() {
    return (
        <Stack.Navigator>
        <Stack.Screen 
        name="Connexion"
        component={LoginScreen}
        />
        <Stack.Screen
        name="Création de compte"
        component={CreateAccount}
        />
        </Stack.Navigator>
      );
};