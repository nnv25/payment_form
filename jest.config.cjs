module.exports = {
    // Используйте этот вариант для тестирования файлов CSS и других нестандартных импортов
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx|mjs|cjs)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy', // Мок для CSS файлов
      '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js', // Мок для SVG файлов
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/(?!(inputmask|card-validator)/)'],
    // Убедитесь, что вы используете `ts-jest` для преобразования TypeScript
    preset: 'ts-jest',
};