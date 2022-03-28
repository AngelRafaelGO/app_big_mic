import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './app/navigation/routesNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}