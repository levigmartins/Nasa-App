import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home'

const Stack = createNativeStackNavigator();

export default function () {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"home"} headerMode={"screen"}>
                <Stack.Screen component={HomeScreen} name="Home" options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}