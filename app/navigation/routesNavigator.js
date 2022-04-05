import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    LoginScreen, CreateAccount, CreateAccountS2, 
    ProfilScreen, Loading, ProfilOptions, SceneForm, 
    CreatePresta, WelcomeScreen, PrestaDetails, EditPresta, 
    SceneDetails, Scenes, SceneFormEdit
    } 
from '../screens/screensIndex';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'; 

import { AuthContext } from '../config/context';
import colors from '../config/colors';
import SearchMainStack from './SearchMainStack';

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
        name='Welcome'
        component={WelcomeScreen}
        options={{
            headerShown: false
        }}
        />
        <LoginStack.Screen 
        name='Login'
        component={LoginScreen}
        options={{ title: 'Connexion' }}
        />
        <LoginStack.Screen 
        name='CreateAccoun1'
        component={CreateAccount} 
        options={{ title: '' }}
        />
        <LoginStack.Screen 
        name='CreateAccount2'
        component={CreateAccountS2}
        options={{ title: '' }}
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
        options={{ 
            headerShown: false
         }}
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
        <ProfilStack.Screen 
        name='PrestaDetails'
        component={PrestaDetails}
        /> 
        <ProfilStack.Screen 
        name='EditPresta'
        component={EditPresta}
        /> 
         <ProfilStack.Screen 
        name='SceneFormEdit'
        component={SceneFormEdit}
        /> 
         <ProfilStack.Screen 
        name='SceneDetails'
        component={SceneDetails}
        /> 
         <ProfilStack.Screen 
        name='Scenes'
        component={Scenes}
        /> 
    </ProfilStack.Navigator>
);

// Main menu screen navigation stack (logged in)
// Adding a new TabsMainStack.Screen will result in
// a new element in the navigation bar + a new stack
const TabsMainStack = createBottomTabNavigator();
const MainScreen = () => (
    <TabsMainStack.Navigator 
    screenOptions={{ 
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
    }}
    >
        <TabsMainStack.Screen 
        name='Search'
        component={SearchMainStack}
        options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
            <AntDesign 
            name="search1" 
            color={color} 
            size={24} />
            ),
        }}
        />
        
        <TabsMainStack.Screen 
        name='Compte'
        component={ProfilStackScreen}
        options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons 
                name="account" 
                color={color} 
                size={24} />
            ),
        }}
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