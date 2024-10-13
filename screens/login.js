import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase/firebaseconfig';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async () => {
    try {
      await signInWithEmailAndPassword(authentication, email, password);
      console.log('User logged in');
    } catch (error) {
      console.error('Login error:', error);
      // Here you might want to show an error message to the user
    }
  };

  return (
    <View>
      <Input
        placeholder='Enter your email'
        label='Email'
        value={email}
        onChangeText={setEmail}
        leftIcon={{ type: 'material', name: 'email' }}
      />
      <Input
        placeholder='Enter your password'
        label='Password'
        value={password}
        onChangeText={setPassword}
        leftIcon={{ type: 'material', name: 'lock' }}
        secureTextEntry
      />
      <Button
        onPress={userLogin}
        title='Login'
      />
      <Button
        onPress={() => navigation.navigate('Register')}
        style={styles.btn}
        title='Register'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
  }
});