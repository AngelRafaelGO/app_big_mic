import React from 'react';
import { SearchSceneScreen, SearchUserScreen } from '../screens/screensindex';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';


//
const SearchMainStack = () => {
    const Tab = createMaterialTopTabNavigator();
    
    return (
        <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: colors.secondary, paddingTop: 25 },
          tabBarIndicatorStyle: {backgroundColor: colors.primary}
        }}
        >
          <Tab.Screen
              name="Recherche de scène"
              component={SearchSceneScreen}
            />
            <Tab.Screen
              name="Recherche de contact"
              component={SearchUserScreen}
            />
        </Tab.Navigator>
    );
  }

  export default SearchMainStack;