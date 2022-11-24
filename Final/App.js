import React from 'react';

import Add from './screens/Add';
import Home2 from './screens/Home2';
import Autenticacion from './screens/logIn';
import signIn from './screens/signIn';
import home from './screens/home';
import UserDetailScreen from './screens/UserDetailScreen';
import Product from './screens/Product';



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Autenticacion" component={Autenticacion} />
      <Stack.Screen name="Home" component={home}/>
      <Stack.Screen name="SignIn" component={signIn}/>
      <Stack.Screen name="home2" component={Home2}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen}/>
      <Stack.Screen name="Add" component={Add}/>
      <Stack.Screen name="Product" component={Product}/>
     
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