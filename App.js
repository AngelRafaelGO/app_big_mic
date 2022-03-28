//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//import TabNavigator from './app/navigation/BottomTabNavigator';
import RootNavigator from './app/navigation/routesNavigator';
//import { render } from 'react-dom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import CreatePresta from './app/screens/CreatePresta';

export default function App() {
  const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen
            name= "Créer une Prestation"
            component = {CreatePresta}
          />
        </Stack.Navigator> */}
        <RootNavigator />
      </NavigationContainer>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
