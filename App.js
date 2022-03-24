import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './app/navigation/BottomTabNavigator';
import RootNavigator from './app/navigation/routesNavigator';

export default function App() {
  return (
    <NavigationContainer>
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
