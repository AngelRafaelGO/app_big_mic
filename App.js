import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import SearchSceneScreen from './app/screens/SearchSceneScreen';
import SearchUserScreen from './app/screens/SearchUserScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default function App() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
            name="Recherche de scène"
            component={SearchSceneScreen}
          />
          <Tab.Screen
            name="Recherche de personne"
            component={SearchUserScreen}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
