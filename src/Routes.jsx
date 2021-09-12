import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './screens/Start';
import Home from './screens/Home';

const Stack = createStackNavigator();

export default function () {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Start"}>
                <Stack.Screen component={StartScreen} name="Start" options={{headerShown: false}}/>
                <Stack.Screen component={Home} name="Home" options={{title: "APOD", headerTitleAlign: "center"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}