import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../Screens/WelcomeScreen';
import BottomTabNavigator from '../Navigators/BottomTabNavigator';
import ReminderScreen from '../Screens/ReminderScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="App" component={BottomTabNavigator} />
      <Stack.Screen name="Reminder" component={ReminderScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
