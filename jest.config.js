const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^.+\\.(css|scss)$": "identity-obj-proxy",
    '@/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

// module.exports = {
//   roots: ['<rootDir>/src'],
//   collectCoverageFrom: [
//     '<rootDir>/src/**/*.{ts}'
//   ],
//   coverageDirectory: 'coverage',
//   testEnvironment: 'node',
//   transform: {
//     '.+\\.ts$': 'ts-jest'
//   }
// }