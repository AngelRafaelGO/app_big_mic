import React from "react";
import { 
    Text, SafeAreaView, 
    View, TouchableOpacity, 
    StyleSheet, useWindowDimensions,
    Image, ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

const FirstTab = () => (
    <View style={styles.tabScreen}>
        <TouchableOpacity style={styles.tabScrArtCardCreate}>
            <Ionicons 
            name='ios-create-outline'
            size={24} 
            color={{ color: colors.white }} />
        </TouchableOpacity>
        <Text>
            Hello, this is the artist profile
        </Text>
    </View>
);

const SecondTab = ({ navigation }) => (
    <View style={styles.tabScreen}>
        <TouchableOpacity 
        style={styles.tabScrSceneCardCreate}
        onPress={() => navigation.navigate('CreateScene')}
        >
            <Ionicons
            name='ios-create-outline'
            size={24}
            color={{ color: colors.white }}
            />
        </TouchableOpacity>
        <Text>
            Hello, here you can create a new scene
        </Text>
    </View>
);

const ThirdTab = () => (
    <View style={styles.tabScreen}>
        <TouchableOpacity style={styles.tabScrLocCardCreate}>
            <Ionicons 
            name='ios-create-outline'
            size={24}
            color={{ color: colors.white }}
            />
        </TouchableOpacity>
        <Text>
            Hello, add a new place to host events!
        </Text>
    </View>
);

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

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <FirstTab navigation={navigation} />;
            case 'second':
                return <SecondTab navigation={navigation} />;
            case 'third' :
                return <ThirdTab navigation={navigation} />;
            default:
                return null;
        };
    };

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.accountInfoView}>
                <TouchableOpacity 
                style={styles.profilOprionsTouchable}
                onPress={() => navigation.navigate('ProfilOptions')}
                >
                    <Ionicons name='settings-outline' size={24} color='white' />
                </TouchableOpacity>
                <Image 
                style={styles.accountImage}
                source={{
                    uri: 'https://avatars.githubusercontent.com/u/53479682?v=4'
                }}
                />
                <Text style={styles.accountText}>
                    Hello, my name is Angel
                </Text>
                <Text style={styles.accountText}>
                    Paris
                </Text>
            </View>
            <TabView 
            navigation={navigation}
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
    accountImage: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 75,
        height: 75,
        borderRadius: 75,
    },
    accountText: {
        color: colors.white,
        marginBottom: 5,
    },
    profilOprionsTouchable: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
    tabScrArtCardCreate: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
    tabScrSceneCardCreate: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
    tabScrLocCardCreate: {
        position: 'absolute',
        right: 20,
        top: 15,
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