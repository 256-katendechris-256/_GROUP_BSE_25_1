import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Button, ListItem, Avatar } from 'react-native-elements';
import { signOut } from 'firebase/auth';
import { authentication, db } from '../firebase/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Home({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(authentication);
      // The onAuthStateChanged listener in App.js will handle navigation
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateToChat = (user) => {
    navigation.navigate('Chat', { user: user, name: user.username });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToChat(item)}>
      <ListItem bottomDivider>
        <Avatar
          rounded
          source={{ uri: item.avatarUrl }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.username}</ListItem.Title>
          <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Text style={styles.header}>Active Users</Text>
        }
      />
      <Button
        title="Logout"
        onPress={handleLogout}
        containerStyle={styles.logoutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  logoutButton: {
    margin: 10,
  },
});