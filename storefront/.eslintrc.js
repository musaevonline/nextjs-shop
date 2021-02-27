const path = require('path')
module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	plugins: [
		'@typescript-eslint',
		'react'
		// 'prettier'
	],
	env: {
		browser: true,
		jest: true
	},
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'prettier/react' // disables react-specific linting rules that conflict with prettier
	],
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.json'),
		tsconfigRootDir: __dirname,
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		}
	},
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off",
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/prefer-as-const': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-var-requires': 'off',

		// These rules don't add much value, are better covered by TypeScript and good definition files
		'react/no-direct-mutation-state': 'off',
		'react/no-deprecated': 'off',
		'react/no-string-refs': 'off',

		'react/require-render-return': 'off',
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.jsx', '.tsx']
			}
		], // also want to use with ".tsx"
		'react/prop-types': 'off', // Is this incompatible with TS props type?

		'interface-name': 0,
		'member-access': 0,
		'no-console': 0,
		'no-debugger': 0,
		'max-classes-per-file': 0,
		'no-implicit-dependencies': 0,
		'no-shadowed-variable': 0,
		'no-submodule-imports': [0],
		'no-var-requires': 0,
		'interface-over-type-literal': 0,
		'variable-name': 0,
		'trailing-comma': 0
	},
	settings: {
		react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		}
	}
}
