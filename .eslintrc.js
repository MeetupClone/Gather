module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    env: {
        node: true,
        browser: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/prop-types': 0,
    },
};
