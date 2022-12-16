/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClosedScreen from './src/screens/closed';
import EditTaskScreen from './src/screens/edit';
import CreateScreen from './src/screens/create';
import {Pressable, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  Edit: {id: number};
  Create: undefined;
};

export type BottomTabList = {
  Home: undefined;
  Closed: undefined;
  Edit: {id: number};
  Create: undefined;
};

const Tab = createBottomTabNavigator<BottomTabList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeStackScreen({navigation}: Props) {
  const onCreatePress = () => {
    navigation.navigate('Create');
  };

  return (
    <>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Closed" component={ClosedScreen} />
      </Tab.Navigator>
      <Pressable onPress={onCreatePress} style={styles.createButton}>
        <Text style={styles.createText}>Create task</Text>
      </Pressable>
    </>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Edit" component={EditTaskScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  createButton: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    borderRadius: 50,
    backgroundColor: '#0059ff',
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
export default App;
