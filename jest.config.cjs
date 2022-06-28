// You only need this file
// - if you don't want to customize your Jest environment
// - if you don't want to use Jest i. e. from a Visual Studio Code extension
const { defaults } = require('jest-config');

const setupFilesAfterEnv = defaults.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

module.exports = {
    preset: '@lwc/jest-preset',
    moduleNameMapper: {
        '^w/(.+)$': '<rootDir>/src/modules/w/$1/$1',
        '^example/(.+)$': '<rootDir>/src/modules/example/$1/$1',
        '^ui/(.+)$': '<rootDir>/jest-mocks/ui/$1/$1',
        'data/wireGetContactListProvider':
            '<rootDir>/jest-mocks/data/wireGetContactListProvider/wireGetContactListProvider'
    },
    globals: {
        'lwc-jest': {
            nativeShadow: true
        }
    },
    // Adding canvas mock for Chart.js tests
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv
};