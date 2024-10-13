import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Login from './screens/login';
import Register from './screens/register';

export default function App() {
  return (
    <View style= {styles.container}>
      {/*<Login/>*/}
      <Register/>
    </View>
 
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