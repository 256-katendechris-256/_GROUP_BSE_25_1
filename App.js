import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={require('./assets/your-profile-image.jpg')}
        />
        <Text style={styles.name}>Your Name</Text>
        <Text style={styles.subtitle}>Your Subtitle</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Brief About</Text>
        <Text style={styles.sectionContent}>
          Write a brief introduction about yourself here. Highlight your key skills and what makes you unique.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.experienceItem}>
          <Text style={styles.experienceTitle}>Job Title 1</Text>
          <Text style={styles.experienceDescription}>
            Description of your role and achievements in this position.
          </Text>
        </View>
        <View style={styles.experienceItem}>
          <Text style={styles.experienceTitle}>Job Title 2</Text>
          <Text style={styles.experienceDescription}>
            Description of your role and achievements in this position.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Get in Touch</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3498db',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  sectionContent: {
    fontSize: 16,
    color: '#34495e',
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  experienceDescription: {
    fontSize: 14,
    color: '#34495e',
  },
  contactButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});