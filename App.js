import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Login from './screens/login';
import Register from './screens/register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
    <Stack.Navigator>

    <Stack.Screen
    name='Login'
    component={Login}
    />
    <Stack.Screen
    name='Register'
    component={Register}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
section: {
  marginBottom: 20,
  width: '100%',
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  },
});