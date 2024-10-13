import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements'

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Username, setUsername] = useState('');
    const [Avatar, setAvatar] = useState('');
  return (
    <View>
     <Input
      placeholder='Username'
      label='username'
      value={Username}
      onChangeText={text => setUsername(text)}
      leftIcon = {{type: 'material', name: 'account-circle'}}
      />
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
      <Input
      placeholder='Avatar url'
      label='Avatar'
      value={Avatar}
      onChangeText={text => setAvatar(text)}
      leftIcon = {{type: 'material', name: 'link'}}
      />

      
    
      <Button
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