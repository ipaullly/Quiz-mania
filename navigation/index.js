import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from '../screens/home';
import Quiz from '../screens/quiz';
import Result from '../screens/result';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false} }
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
