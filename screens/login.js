import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase/firebaseconfig';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = async() => {
        signInWithEmailAndPassword(authentication, email, password)
        .then(() => console.log('user logged in'))
    }
  return (
    <View>
      <Input
      placeholder='Enter your email'
      label='Email'
      value={email}
      onChangeText={text => setEmail(text)}
      leftIcon = {{type: 'material', name: 'email'}}
      />

    <Input
      placeholder='Enter your password'
      label='Password'
      value={password}
      onChangeText={text => setPassword(text)}
      leftIcon = {{type: 'material', name: 'lock'}}
      secureTextEntry
      />
      <Button
      onPress={userLogin}
      title='Login'
      />
      <Button
      onPress={() => navigation.navigate('Register')}
     style ={styles.btn}
      title='Register'
      />
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{
        marginTop: 10,
         
    }
})