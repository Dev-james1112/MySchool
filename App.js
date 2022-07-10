import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import Main from './pages/pages/Main';
import Setsc from './pages/pages/start_school';
const Stack = createStackNavigator();


function App()  {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{headerStyle: {backgroundColor: '#fff'}}}>
        <Stack.Screen name="Main" component={Main}  options={{ headerShown: false }}/>
        <Stack.Screen name="Setsc" component={Setsc} options={{ title: '' }}/>


      </Stack.Navigator>

    </NavigationContainer>

  );
};

export default App;