import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import { loadSchool } from './assets/scripts/AsyncStorage';

import Main from './pages/pages/Main';
import Setsc from './pages/pages/start_school';
import SetCom from './pages/pages/school_set_complete';

export type StackParams = {
  Home,
  Set,
  SetCom,
};

const Stack = createStackNavigator<StackParams>();


function App()  {
    const [school_data, setSchool_data] = useState("ff");
    useEffect (() => {
        loadSchool().then(data => setSchool_data(data))
    }, []);
    console.log(school_data)
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
      </Stack.Navigator>

    </NavigationContainer>

  )
};

export default App;