// Built-In Modules Import
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";

// Scripts Modules Import
import { loadSchool, saveSchool } from './assets/scripts/AsyncStorage';

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
  const [initial_home, setInitial_home] = useState();
  const [ alert, alertSet ] = useState(false);
  //saveSchool("@NM", "")
  loadSchool("@NM").then(data => setSchool_data(data))

  useEffect(() => {
    if (school_data != "값없음") {
      setInitial_home("Home");
    } else {
      setInitial_home("Meal");
    } 
  }, [school_data])
  useEffect(()=>{
    const timer = setTimeout(()=>{ alertSet(true) }, 10);
  });
  return (
    <NavigationContainer>
    {alert == true ? (
      <Stack.Navigator initialRouteName={initial_home} screenOptions={{headerStyle: {backgroundColor: '#fff'}}}>
        <Stack.Screen name="Home" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Set" component={Setsc} options={{ title: '' }}/>
        <Stack.Screen name="SetCom" component={SetCom} options={{ title: '' ,  headerStyle: {backgroundColor: '#F7F7F7'}}}/>
        <Stack.Screen name="Meal" component={Meal} options={{ headerShown: false }}/>
        <Stack.Screen name="Meal_more" component={Meal_more} options={{ title: '급식 정보' ,  headerStyle: {backgroundColor: '#FBFBFB'}}}/>
      </Stack.Navigator>
    ) : null}
    </NavigationContainer>
  )
};

export default App;