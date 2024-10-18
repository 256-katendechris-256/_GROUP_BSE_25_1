module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@grafana/faro-react|@grafana/faro-web-tracing)/)',
    ],
    setupFiles: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };