
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import SearchSceneScreen from './screens/SearchSceneScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Recherche de scène"
            component={SearchSceneScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
