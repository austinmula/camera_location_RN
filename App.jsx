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

const Tab = createBottomTabNavigator();

const Homepage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="second"
        options={{headerShown: false}}
        component={SecondPage}
      />
      <Tab.Screen
        name="third"
        options={{headerShown: false}}
        component={ThirdPage}
      />
    </Tab.Navigator>
  );
};

const SecondPage = () => {
  return (
    <View>
      <Text>Second page</Text>
    </View>
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
        <Drawer.Screen name="home" component={Homepage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
