import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import { saveSchool, loadSchool } from './assets/scripts/AsyncStorage';

import Main from './pages/pages/Main';
import Setsc from './pages/pages/start_school';

const Stack = createStackNavigator();

function App()  {
    const [school_data, setSchool_data] = useState("ff");
    useEffect (() => {
        loadSchool().then(data => setSchool_data(data))
    }, []);
    console.log(school_data)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: {backgroundColor: '#fff'}}}>
        {school_data == "false" ? (<Stack.Group>
            <Stack.Screen name="Home" component={Main} options={{ headerShown: false }}/>
            <Stack.Screen name="Set" component={Setsc} options={{ title: '' }}/>
        </Stack.Group>):
        (<Stack.Screen name="Setsc" component={Setsc} options={{ headerShown: false }}/>)}


      </Stack.Navigator>

    </NavigationContainer>

  )
};

export default App;