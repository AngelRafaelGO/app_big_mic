import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from '@react-navigation/bottom-tabs';
// import changeNavigationBarColor, {
//     hideNavigationBar,
//     showNavigationBar,
//   } from 'react-native-navigation-bar-color';
  
//import { TabNavigator } from 'react-navigation';
//import { StatusBar, View } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
//import { Component } from 'react/cjs/react.production.min';
import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <Text> Home Screen</Text>
            </View>
        );
    }
}

class ProfileScreen extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <Text>Profile  Screen</Text>
            </View>
        );
    }
}

class ImageScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text>Image Screen</Text>  
            </View>  
        );  
    }  
}

class CartScreen extends React.Component {  
    render() {  
        return (  
            <View style={styles.container}>  
                <Text>Cart Screen</Text>  
            </View>  
        );  
    }  
} 

const styles = StyleSheet.create({  
    container: {  
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },  
});

const TabNavigator = createBottomTabNavigator({
        initialRouteName: "Home",  
        activeColor: '#f0edf6',  
        inactiveColor: '#226557',  
        barStyle: { backgroundColor: '#3BAD87' },
});
const HomeS = () =>{HomeScreen};
const ProfileS = () =>{ProfileScreen};
const ImageS = () =>{ImageScreen};
const CartS = () =>{CartScreen};
const setIcon = (screenName)=>{
    let iconName
    switch (screenName){
        case 'HomeS' : iconName = 'home'; break
        case 'ProfileS' : iconName = 'profile'; break 
        case 'ImageS' : iconName = 'image'; break
        case 'CartS' : iconName = 'cart'
    }
    return <Icon name = {iconName} color = '#FFFFFF' size = {30} />
}
const ScreenOptionStyle = (text) => {
    navigationOptions:{  
        tabBarLabel:{text}  
        tabBarIcon: ({ tintColor }) => (  
            <View>  
                {setIcon(text)} 
            </View>);  
        activeColor: '#f60c0d';
        inactiveColor: '#f65a22';  
        barStyle: { backgroundColor: '#f69b31' };
    }  
};

function AppTab() { 
    return( 
        <TabNavigator.Navigator
            screenOptions={{
                showIcon: true,
                // tabBarIcon: ({color}) =>  screenOptions(route),
                tabBarIconStyle: {color:'#FF0000', tintColor: '#000000'},
                tabBarShowLabel : false,
                focused:true,
                IcontintColor : '#6e0f0f',
                tabBarStyle:{
                backgroundColor : '#0c6614',
                },
            }}>
            <TabNavigator.Screen name = "Home" options= {ScreenOptionsStyle} component ={HomeScreen} />
            <TabNavigator.Screen name = "Profile" options= {ScreenOptionsStyle} component ={ProfileScreen} />
            <TabNavigator.Screen name = "Image" options= {ScreenOptionsStyle} component ={ImageScreen} />
            <TabNavigator.Screen name = "Cart" options= {ScreenOptionsStyle} component ={CartScreen} />
        </TabNavigator.Navigator>
    );
}  

    //     Home: { screen: HomeScreen,  
    //         navigationOptions:{  
    //             tabBarLabel:'Home',  
    //             tabBarIcon: ({ tintColor }) => (  
    //                 <View>  
    //                     <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
    //                 </View>),  
    //         }  
    //     },  
    //     Profile: { screen: ProfileScreen,  
    //         navigationOptions:{  
    //             tabBarLabel:'Profile',  
    //             tabBarIcon: ({ tintColor }) => (  
    //                 <View>  
    //                     <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>  
    //                 </View>),  
    //             activeColor: '#f60c0d',  
    //             inactiveColor: '#f65a22',  
    //             barStyle: { backgroundColor: '#f69b31' },  
    //         }  
    //     },  
    //     Image: { screen: ImageScreen,  
    //         navigationOptions:{  
    //             tabBarLabel:'History',  
    //             tabBarIcon: ({ tintColor }) => (  
    //                 <View>  
    //                     <Icon style={[{color: tintColor}]} size={25} name={'ios-images'}/>  
    //                 </View>),  
    //             activeColor: '#615af6',  
    //             inactiveColor: '#46f6d7',  
    //             barStyle: { backgroundColor: '#67baf6' },  
    //         }  
    //     },  
    //     Cart: {  
    //         screen: CartScreen,  
    //         navigationOptions:{  
    //             tabBarLabel:'Cart',  
    //             tabBarIcon: ({ tintColor }) => (  
    //                 <View>  
    //                     <Icon style={[{color: tintColor}]} size={25} name={'ios-cart'}/>  
    //                 </View>),  
    //         }  
    //     },  
    // ),  
  
//export default createAppContainer(TabNavigator);  
export default TabNavigator; 