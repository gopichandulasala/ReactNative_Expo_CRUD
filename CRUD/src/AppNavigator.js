
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import EditUser from './screens/EditUser';
import AddUser from './screens/AddUser';
import CustomHeader from './CustomHeader';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name={'Home'}
         
        />
        <Stack.Screen
          component={AddUser}
          name={'AddUser'}
          
        />
        <Stack.Screen
          component={EditUser}
          name={'EditUser'}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;