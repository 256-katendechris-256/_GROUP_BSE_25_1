import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from './firebase/firebaseconfig';
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import Chat from './screens/chat';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
             name="Home" 
             component={Home} 
             options={{ headerShown: false }} 
             />
            <Stack.Screen 
            name="Chat" 
            component={Chat} 
            options={({route})=>({
              headerBackVisible: false,
              title: route.params.name,
              headerTitleStyle: {fontWeight: 'bold'},
              headerTitleAlign: 'center'
            })}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}