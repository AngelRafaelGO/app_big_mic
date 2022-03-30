import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './app/navigation/routesNavigator';

import { SceneForm } from './app/screens/screensIndex';
import { SceneCard } from './app/screens/cards/SceneCard';

export default function App() {

  return (
    <NavigationContainer>
     <RootNavigator />   
      
     
    </NavigationContainer>
  );
}
