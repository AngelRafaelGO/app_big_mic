import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {Card, FAB, Avatar, Title, Paragraph} from 'react-native-paper';

import colors from '../config/colors';

function Lieux({ navigation }) {
    return (
        <View style={styles.container}>
          <FlatList
            // data = {data}
            // renderItem = {({item}) => {
            //   return renderData(item)
            // }}
            // onRefresh = {() => loadData()}
            // refreshing = {loading}
            // keyExtractor = {item => `${item.numprest}`}
          />
          <View style = {styles.fabView}>
          <FAB
              small={false}
              icon="plus"
              color='white'
              theme= {{colors:{accent:"rgb(255, 72, 88)"}}}
              onPress = {() => navigation.navigate('CreateLieu')}
              />
            </View>
        </View>
      );    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },    
    fabView: {
        position: 'absolute',
        flexDirection: 'row',
        right: 10,
        top: 10
      },    
});

export default Lieux;