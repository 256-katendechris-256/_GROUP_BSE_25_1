import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { authentication } from './firebase/firebaseconfig';
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import Chat from './screens/chat';

import {createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { getWebInstrumentations, initializeFaro, ReactIntegration, ReactRouterVersion, FaroRoutes } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

initializeFaro({
    url: 'https://faro-collector-prod-us-east-0.grafana.net/collect/72e90fa32843c908041c77192bb1207b',
    app: {
      name: 'half-a-man',
      version: '1.0.0',
      environment: 'production'
    },
    
    instrumentations: [
      // Mandatory, omits default instrumentations otherwise.
      ...getWebInstrumentations(),

      // Tracing package to get end-to-end visibility for HTTP requests.
      new TracingInstrumentation(),


      new ReactIntegration(
        {
          router:{
            version: ReactRouterVersion.V6,
            dependencies: {
              createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType,
            },
          }
        }
      )
    ],
  });



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
    <Router>
      <FaroRoutes>
        {/* If user is authenticated, show Home and Chat routes */}
        {user ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route 
              path="/chat" 
              element={<Chat />} 
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            {/* If user is not authenticated, show Login and Register routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </FaroRoutes>
    </Router>
  );
}