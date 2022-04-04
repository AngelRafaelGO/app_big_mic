import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './app/navigation/routesNavigator';
import 'react-native-gesture-handler'

export default function App() {
  return (
    <NavigationContainer>
     <RootNavigator />   
    </NavigationContainer>
  );
}