module.exports = {
	extends: ['eslint:recommended', 'plugin:react/recommended'],

	globals: { Promise: true, Set: true },
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
		'no-console': 0,
		'react/prop-types': 0,
	},
};
