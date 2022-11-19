import React from 'react';

import Autenticacion from './screens/Autenticacion';
import signIn from './screens/signIn';
import home from './screens/home';
import UserDetailScreen from './screens/UserDetailScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Autenticacion" component={Autenticacion} />
      <Stack.Screen name="SignIn" component={signIn}/>
      <Stack.Screen name="home" component={home}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen}/>
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}