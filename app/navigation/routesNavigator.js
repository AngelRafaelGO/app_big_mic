import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, 
    CreateAccount, 
    CreateAccountS2, 
    ProfilScreen, 
    Loading, 
    ProfilOptions, 
    SceneForm, 
    SearchMainStack,
    CreatePresta  } from '../screens/screensIndex';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthContext } from '../config/context';

// Here we create objects to pass as parameters between screens
export let routeParams = {
    LoginScreen: undefined,
    CreateAccount: undefined,
    CreateAccountS2: undefined,
};

// Login/Signup screen stack
const LoginStack = createNativeStackNavigator();
const LoginStackScreen = () => (
    <LoginStack.Navigator>
        <LoginStack.Screen 
        name='Login'
        component={LoginScreen}
        options={{ title: 'Connexion' }}
        />
        <LoginStack.Screen 
        name='CreateAccoun1'
        component={CreateAccount} 
        options={{ title: 'Création de compte' }}
        />
        <LoginStack.Screen 
        name='CreateAccount2'
        component={CreateAccountS2}
        options={{ title: 'Création de compte' }}
        />
    </LoginStack.Navigator>
);

// Profil stack screen
const ProfilStack = createNativeStackNavigator();
const ProfilStackScreen = () => (
    <ProfilStack.Navigator >
        <ProfilStack.Screen 
        name='Profil'
        component={ProfilScreen}
        options={{ title: 'Compte' }}
        />
        <TabsMainStack.Screen 
        name='ProfilOptions'
        component={ProfilOptions}
        options={{ title: 'Options de compte' }}
        />
        <ProfilStack.Screen 
        name='CreateScene'
        component={SceneForm}
        /> 
        <ProfilStack.Screen 
        name='CreatePresta'
        component={CreatePresta}
        /> 
    </ProfilStack.Navigator>
);

// Main menu screen navigation stack (logged in)
// Adding a new TabsMainStack.Screen will result in
// a new element in the navigation bar + a new stack
const TabsMainStack = createBottomTabNavigator();
const MainScreen = () => (
    <TabsMainStack.Navigator 
    screenOptions={{ headerShown: false }}
    >
        <TabsMainStack.Screen 
        name='Compte'
        component={ProfilStackScreen}
        />
        <TabsMainStack.Screen 
        name='Recherche'
        component={SearchMainStack}
        />
    </TabsMainStack.Navigator>
);

export function RootNavigator() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userPassword, setUserPassword] = React.useState(null);

    const authContext = React.useMemo(() => {
        // These functions enable logIn/logOut logic
        return {
            signIn: (password) => {
                setIsLoading(false);
                setUserPassword(password);
            },
            signUp: (password) => {
                console.log(password);
                setIsLoading(false);
                setUserPassword(password);
            },
            signOut: () => {
                setIsLoading(false);
                setUserPassword(null);
            }
        };
    }, []);

    // This effect component simulates the loading time needed
    // to athentificate a user
    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, []); 

    if (isLoading) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={authContext}>
            {userPassword ? (
                <MainScreen />
            ) : (
                <LoginStackScreen />
            )}
        </AuthContext.Provider>
    );
};