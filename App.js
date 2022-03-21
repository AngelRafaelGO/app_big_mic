
import { StyleSheet} from 'react-native';
import SearchSceneScreen from './screens/SearchSceneScreen';

export default function App() {
let x = 1;
console.log(x);

  return (
    <SearchSceneScreen />
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
