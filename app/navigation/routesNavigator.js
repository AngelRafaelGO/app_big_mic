import react from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, CreateAccount, CreateAccountS2 } from '../screens/screensIndex';

// Here we create objects to pass as parameters between screens
export let routeParams = {
    LoginScreen: undefined,
    CreateAccount: undefined,
    CreateAccountS2: undefined,
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
        <Stack.Screen 
        name="Création de compte 2"
        component={CreateAccountS2}
        />
        </Stack.Navigator>
      );
};