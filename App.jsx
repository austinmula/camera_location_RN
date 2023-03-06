/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Text, View} from 'react-native';
import LocationScreen from './screens/LocationScreen';
import CameraScreen from './screens/CameraScreen';

const Tab = createBottomTabNavigator();

const Homepage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="location"
        options={{headerShown: false}}
        component={LocationScreen}
      />
      <Tab.Screen
        name="camera"
        options={{headerShown: false}}
        component={CameraScreen}
      />
    </Tab.Navigator>
  );
};

const ThirdPage = () => {
  return (
    <View>
      <Text>Third page</Text>
    </View>
  );
};

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="home"
          component={Homepage}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
