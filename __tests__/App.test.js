import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the firebase config
jest.mock('../firebase/firebaseconfig', () => ({
  authentication: {},
}));

// Mock the Chat component
jest.mock('../screens/chat', () => 'Chat');

test('renders without crashing', () => {
  render(<App />);
});