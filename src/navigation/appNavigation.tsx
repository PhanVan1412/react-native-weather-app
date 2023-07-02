import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, Text, View } from 'react-native';

import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const initBox: string[] = ['Non-serializable values were found in the navigation state'];
LogBox.ignoreAllLogs(true);

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
