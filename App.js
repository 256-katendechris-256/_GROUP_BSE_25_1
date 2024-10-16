import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from './firebase/firebaseconfig';
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import Chat from './screens/chat';

import { initializeFaro, createReactRouterV6DataOptions, ReactIntegration, getWebInstrumentations } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

// Initialize Faro monitoring and instrumentation
initializeFaro({
  url: 'https://faro-collector-prod-us-east-0.grafana.net/collect/da9039ac3074f4c26cd331939ff3844f',
  app: {
    name: 'half-a-man',
    version: '1.0.0',
    environment: 'production',
  },
  instrumentations: [
    ...getWebInstrumentations(),
    new TracingInstrumentation(),
    new ReactIntegration({
      router: createReactRouterV6DataOptions(),
    }),
  ],
});

// Create your routes using createBrowserRouter
const reactBrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home route
  },
  {
    path: "/chat",
    element: <Chat />, // Chat route
  },
  {
    path: "/login",
    element: <Login />, // Login route
  },
  {
    path: "/register",
    element: <Register />, // Register route
  },
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>, // Catch-all 404 route
  },
]);

// Wrap the router with Faro instrumentation
const browserRouter = withFaroRouterInstrumentation(reactBrowserRouter);

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
    <RouterProvider router={browserRouter} />
  );
}
