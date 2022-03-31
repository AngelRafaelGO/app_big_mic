import React from "react";
import { 
    Text, SafeAreaView, 
    View, TouchableOpacity, 
    StyleSheet, useWindowDimensions,
    Image
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons"


import colors from "../config/colors";
import Prestations from "./Prestations";

const FirstTab = ({navigation}) => (
    <View style={styles.tabScreen}>
        <View style={styles.tabScrArtCardCreate}>
        </View>
        < Prestations navigation = {navigation} />    
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
        {key: 'first', title: 'Prestations'},
        {key: 'second', title: 'Scènes'},
        {key: 'third', title: 'Lieux'},
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
                <TouchableOpacity style={styles.tchChangePImage}>
                    <Image 
                    style={styles.accountImage}
                    source={{
                        uri: 'https://avatars.githubusercontent.com/u/53479682?v=4'
                    }}
                    />                    
                </TouchableOpacity>
                <View style={styles.accountDescriptionView}>
                    <View style={styles.profileTxtView}>
                        <AntDesign style={styles.profileTxtIcon} name='user' size={24} color={colors.white} />
                        <Text style={styles.accountText}>
                            Angel Rafael
                        </Text>
                    </View>
                    <View style={styles.profileTxtView}>
                        <EvilIcons style={styles.profileTxtIcon} name='location' size={24} color={colors.white} />
                        <Text style={styles.accountText}>
                            Paris
                        </Text>
                    </View>
                </View>
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
        width: '100%',
        height: '30%',
        backgroundColor: colors.primary,
    },
    accountDescriptionView: {
        left: 10,
    },
    accountImage: {
        width: 75,
        height: 75,
        borderRadius: 75,
    },
    accountText: {
        fontSize: 16,
        color: colors.white,
        marginBottom: 5,
    },
    mainView: {
        flex: 1,
    },
    profileTxtIcon: {
        marginRight: 10,
    },
    profileTxtView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
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
    tchChangePImage: {
        top: 10,
        width: 100,
        height: 100,
        left: 10,
    },
});

export default ProfilScreen;