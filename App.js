import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './app/navigation/routesNavigator';

import { SceneForm } from './app/screens/screensIndex';

export default function App() {

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
