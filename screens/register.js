import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, doc, setDoc, collection } from 'firebase/firestore';
import { authentication, db } from '../firebase/firebaseconfig.js';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');

    const registerUser = async () => {
        if (!email || !password || !username) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
            const userUID = userCredential.user.uid;
            const docRef = await addDoc(collection(db, 'users') 
             , {
                avatarUrl: avatar || 'data:image/png;base64,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',
                username,
                password,
                email,
                userUID
            });
            console.log('User registered successfully');
            Alert.alert('Success', 'Registration successful!', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder='Username'
                label='Username'
                value={username}
                onChangeText={setUsername}
                leftIcon={{ type: 'material', name: 'account-circle' }}
            />
            <Input
                placeholder='Enter your email'
                label='Email'
                value={email}
                onChangeText={setEmail}
                leftIcon={{ type: 'material', name: 'email' }}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                value={password}
                onChangeText={setPassword}
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
            />
            <Input
                placeholder='Avatar url (optional)'
                label='Avatar'
                value={avatar}
                onChangeText={setAvatar}
                leftIcon={{ type: 'material', name: 'link' }}
            />
            <Button
                onPress={registerUser}
                containerStyle={styles.btn}
                title='Register'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    btn: {
        marginTop: 20,
    }
});