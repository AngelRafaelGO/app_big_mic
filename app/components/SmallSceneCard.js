import { StyleSheet } from "react-native";
import { Card , Badge} from "react-native-paper";
import colors from "../config/colors";


const SmallSceneCard = (item, onPress) => {
    const date = item.datescene.split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return (
    <Card
    style={styles.itemContainer}
    onPress={()=>{onPress}}>
        <Card.Title
        title={item.titrescene}
        subtitle={item.descscene}
        left={(props) => <Badge 
            size={50} 
            style= {styles.date}>{day}.{month}</Badge>}
        />
    </Card>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
      marginVertical:5,
      marginHorizontal: 20,
    },
    date: {
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: colors.primary, 
      color: colors.white,
    },
  })

export default SmallSceneCard;
