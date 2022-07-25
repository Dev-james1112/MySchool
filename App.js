// Built-In Modules Import
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";

// Scripts Modules Import
import { loadSchool } from './assets/scripts/AsyncStorage';

// Pages Import
import Main from './pages/pages/Main';
import Setsc from './pages/pages/start_school';
import SetCom from './pages/pages/school_set_complete';
import Meal from './pages/pages/meal';
import Meal_more from './pages/pages/meal_more';

// Config
const Stack = createStackNavigator();

function App()  {
    const [school_data, setSchool_data] = useState("");
    useEffect (() => {
        loadSchool("@NM").then(data => setSchool_data(data))
    }, []);
/*{school_data == "false" ? (<Stack.Group>
            <Stack.Screen name="Home" component={Main} options={{ headerShown: false }}/>
            <Stack.Screen name="Set" component={Setsc} options={{ title: '' }}/>
        </Stack.Group>):
        (<Stack.Screen name="Set" component={Setsc} options={{ headerShown: false }}/>)}*/
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: {backgroundColor: '#fff'}}}>
        <Stack.Screen name="Home" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Set" component={Setsc} options={{ title: '' }}/>
        <Stack.Screen name="SetCom" component={SetCom} options={{ title: '' ,  headerStyle: {backgroundColor: '#F7F7F7'}}}/>
        <Stack.Screen name="Meal" component={Meal} options={{ headerShown: false }}/>
        <Stack.Screen name="Meal_more" component={Meal_more} options={{ title: '급식 정보' ,  headerStyle: {backgroundColor: '#FBFBFB'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;