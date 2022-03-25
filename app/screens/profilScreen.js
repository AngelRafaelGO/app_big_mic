import React from "react";
import { Text, SafeAreaView, View, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

const firstTab = () => (
    <View style={styles.tabScreen}>
        <Text>
            Artiste
        </Text>
    </View>
);
const secondTab = () => (
    <View style={styles.tabScreen}>
        <Text>
            Ogranisateur
        </Text>
    </View>
);
const thirdTab = () => (
    <View style={styles.tabScreen}>
        <Text>
            Exploitant lieux
        </Text>
    </View>
);
const renderScene = SceneMap({
    first: firstTab,
    second: secondTab,
    third: thirdTab,
});

const renderTabBar = props => (
    <TabBar 
    {...props}
    indicatorStyle={{ backgroundColor: colors.primary }}
    style={{ backgroundColor: colors.dark,}}
    />
);

function ProfilScreen({ navigation }) {
        
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Artist'},
        {key: 'second', title: 'Orga'},
        {key: 'third', title: 'Exploitant'},
    ]);

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.accountInfoView}>
                <TouchableOpacity 
                style={styles.profilOprionsTouchable}
                onPress={() => navigation.navigate('ProfilOptions')}
                >
                    <Ionicons name='settings-outline' size={24} color='white' />
                </TouchableOpacity>
                <Text style={{ color: colors.white }}>
                    Hello, my name is Angel
                </Text>
            </View>
            <TabView 
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    accountInfoView: {
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: '30%',
        backgroundColor: colors.primary,
    },
    profilOprionsTouchable: {
        position: 'absolute',
        right: -10,
        top: 20,
        width: 50,
        height: 50,
    },
    tabScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '100%',
        height: '100%',
    },
    tabViewStyle: {
        backgroundColor: colors.primary,
    },
    mainView: {
        flex: 1,
    },
});

export default ProfilScreen;