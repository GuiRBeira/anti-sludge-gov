import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default tseslint.config(
	{
		ignores: ["node_modules/", ".plasmo/", "build/", "dist/"]
	},
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		plugins: {
			react: reactPlugin,
			"react-hooks": reactHooksPlugin,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				chrome: "readonly",
			},
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			"react/react-in-jsx-scope": "off", // Not needed with modern React
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"no-console": ["warn", { allow: ["warn", "error", "log"] }],
      "eslint-comments/no-unused-disable": "off"
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: ["**/*.js", "**/*.mjs"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	}
);
