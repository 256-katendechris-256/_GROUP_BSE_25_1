try {
  require('react-native-gesture-handler/jestSetup');
} catch (error) {
  console.warn('react-native-gesture-handler/jestSetup not found. Skipping.');
}

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-gifted-chat', () => 'GiftedChat');

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Additional mocks for Grafana Faro and react-router-dom
jest.mock('@grafana/faro-react', () => ({
  getWebInstrumentations: jest.fn(),
  ReactIntegration: jest.fn(),
  ReactRouterVersion: {},
  FaroRoutes: jest.fn(),
  initializeFaro: jest.fn(),
}));

jest.mock('@grafana/faro-web-tracing', () => ({
  TracingInstrumentation: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  createRoutesFromChildren: jest.fn(),
  matchRoutes: jest.fn(),
  Routes: jest.fn(),
  useLocation: jest.fn(),
  useNavigationType: jest.fn(),
}));

// Mock any other problematic imports here