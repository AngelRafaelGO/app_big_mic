import React from "react";
import { 
    Text, SafeAreaView, 
    View, TouchableOpacity, 
    StyleSheet, useWindowDimensions,
    Image
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons"

import { AuthContext } from "../config/context";
import colors from "../config/colors";
import Prestations from "./Prestations";
import Scenes from "./Scenes";

const FirstTab = ({ navigation }) => (
    <View style={styles.tabScreen}>
        < Prestations navigation = {navigation} />    
    </View>
);

const SecondTab = ({ navigation }) => (
    <View style={styles.tabScreen}>
        <View style={styles.tabScrArtCardCreate}>
        </View>
        <Scenes navigation= {navigation} />
    </View>
);

const renderTabBar = props => (
    <TabBar 
    {...props}
    indicatorStyle={{ backgroundColor: colors.primary }}
    style={{ backgroundColor: colors.dark,}}
    />
);

function ProfilScreen({ navigation, route }) {

    const { getData } = React.useContext(AuthContext);
    let userAccountData = getData();
    let { prenom } = userAccountData[0];
    let { ville } = userAccountData[0];

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Prestations'},
        {key: 'second', title: 'Scènes'},
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <FirstTab navigation={navigation} />;
            case 'second':
                return <SecondTab navigation={navigation} />;
            default:
                return null;
        };
    };

    return (
        <View style={styles.mainView}>
            <View 
            style={styles.accountInfoView}
            >
                <TouchableOpacity 
                style={styles.profilOprionsTouchable}
                onPress={() => {
                    navigation.navigate('ProfilOptions')
                }}
                >
                    <Ionicons name='settings-outline' size={24} color='white' />
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.tchChangePImage}
                onPress={() => {
                    navigation.navigate('ChangerImage')}
                } 
                >
                    <Image 
                    style={styles.accountImage}
                    source={{
                        uri: 'https://picsum.photos/200'
                    }}
                    />                    
                </TouchableOpacity>
                <View>
                    <View style={styles.profileTxtView}>
                        <AntDesign style={styles.profileTxtIcon} name='user' size={18} color={colors.white} />
                        <Text style={styles.accountText}>
                            {prenom}
                        </Text>
                    </View>
                    <View style={styles.profileTxtView}>
                        <EvilIcons style={styles.profileTxtIcon} name='location' size={18} color={colors.white} />
                        <Text style={styles.accountText}>
                            {ville}
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
        </View>
    );
};

const styles = StyleSheet.create({
    accountInfoView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30%',
        backgroundColor: colors.primary,
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    profilOprionsTouchable: {
        position: 'absolute',
        right: 15,
        top: 40,
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
    },
});

export default ProfilScreen;