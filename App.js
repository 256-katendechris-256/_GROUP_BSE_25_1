import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Portfolio</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text>Hello! I'm a web developer passionate about creating amazing websites.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text>- HTML/CSS</Text>
        <Text>- JavaScript</Text>
        <Text>- React Native</Text>
        <Text>- Node.js</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        <Text>1. Portfolio Website (You're looking at it!)</Text>
      </View>
    </ScrollView>
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