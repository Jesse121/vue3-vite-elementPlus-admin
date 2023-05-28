module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	}, //定义eslint依赖的插件
	plugins: ["@typescript-eslint", "prettier"], //定义文件继承的代码规范
	extends: [
		"plugin:vue/vue3-recommended",
		"plugin:prettier/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript"
	],
	parserOptions: {
		//解析ts文件
		parser: "@typescript-eslint/parser",
		sourceType: "module",
		ecmaVersion: 2020,
		ecmaFeatures: {
			tsx: true // 允许解析TSX
		}
	},
	settings: {
		"import/resolver": {
			typescript: true,
			node: true
		}
	},
	rules: {
		"prettier/prettier": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/camelcase": "off",
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"vue/html-self-closing": [
			"error",
			{
				html: {
					component: "always",
					normal: "always",
					void: "any"
				},
				math: "always",
				svg: "always"
			}
		],
		"vue/require-default-prop": "off",
		"vue/no-v-html": "off",
		"import/order": [
			"error",
			{
				// 对导入模块进行分组
				groups: [
					"builtin", // 内置模块
					"external", // 外部模块
					[
						"parent", //父节点依赖
						"sibling" //兄弟依赖
					],
					"internal", //内部引用
					"index", // index文件
					"type", //类型文件
					"unknown"
				],
				//通过路径自定义分组
				pathGroups: [
					{
						pattern: "@/**", // 把@开头的应用放在internal分组后面
						group: "external",
						position: "after"
					}
				],
				// 是否开启独特组，用于区分自定义规则分组和其他规则分组
				distinctGroup: true,
				// 每个分组之间换行
				"newlines-between": "always",
				// 相同分组排列规则
				alphabetize: { order: "asc" }
			}
		]
	},
	overrides: [
		{
			files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
			env: {
				jest: true
			}
		}
	]
};
