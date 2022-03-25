import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import SearchMainStack from './app/navigation/SearchMainStack';


export default function App() {

  return (
    <NavigationContainer>
      <SearchMainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});
