import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

export default config;
