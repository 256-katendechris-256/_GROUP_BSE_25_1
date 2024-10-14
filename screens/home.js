import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { Button, ListItem, Avatar } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { authentication, db } from '../firebase/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Home({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = authentication.currentUser;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      const userList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(user => user.id !== currentUser.uid);
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users: ", error);
      Alert.alert("Error", "Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(authentication);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const navigateToChat = (chatPartner) => {
    navigation.navigate('Chat', { user: chatPartner });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToChat(item)}>
      <ListItem bottomDivider>
        <Avatar
          rounded
          source={{ uri: item.avatarUrl || 'https://placehold.co/100x100?text=Avatar' }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.username || item.email}</ListItem.Title>
          <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome, {currentUser.email}</Text>
      {loading ? (
        <Text>Loading users...</Text>
      ) : users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>No other users found.</Text>}
        />
      ) : (
        <Text>No other users available to chat with.</Text>
      )}
      <Button
        title="Logout"
        onPress={handleLogout}
        containerStyle={styles.logoutButton}
      />
      <Button
        title="Refresh Users"
        onPress={fetchUsers}
        containerStyle={styles.refreshButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 10,
  },
  refreshButton: {
    marginTop: 10,
  },
});