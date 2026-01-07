import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import boundariesPlugin from 'eslint-plugin-boundaries';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import securityPlugin from 'eslint-plugin-security';
import unicornPlugin from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        ignores: ['**/generated/**', 'dist/**', '.next/**', 'node_modules/**', 'out/**'],
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
            tsdoc: tsdocPlugin,
            security: securityPlugin,
            unicorn: unicornPlugin,
            sonarjs: sonarjs,
        },
        rules: {
            /* ==================
             *      PRETTIER
             * ================== */
            /**
             * Force l'utilisation de guillemets simples pour les chaînes de caractères.
             */
            quotes: ['error', 'single', { avoidEscape: true }],

            /* ==================
             *      TYPESCRIPT
             * ================== */
            /**
             * Ruleset strict pour TypeScript. Contient le set recommandé et ajoute
             * quelques règles supplémentaires.
             * 43 règles recommandées, 23 règles strictes.
             * Voir liste et explications ici : https://typescript-eslint.io/rules/
             */
            ...tseslint.configs.strict.rules,
            /**
             * Autorisation des variables non-utilisées si elles sont préfixées par '_'
             */
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'parameter',
                    modifiers: ['unused'],
                    format: ['strictCamelCase'],
                    leadingUnderscore: 'require',
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            /**
             * Interdiction de console.log en autorisant les autres instructions console
             * pour le suivi d'exécution (console.info, console.time, ...)
             */
            'no-console': [
                'error',
                {
                    allow: ['warn', 'error', 'info', 'time', 'timeEnd'],
                },
            ],
            /**
             * Autorisation d'utiliser des classes comme namespace (i.e. Logger).
             * Il s'agit d'une règle du set 'strict' de tseslint s'opposant à une
             * approche OOP commune.
             */
            '@typescript-eslint/no-extraneous-class': 'off',
            /**
             * Oblige à utiliser un type de retour pour les fonctions.
             */
            '@typescript-eslint/explicit-function-return-type': 'error',
            /**
             * Oblige à utiliser la syntaxe raccourcie pour les propriétés d'objet.
             */
            'object-shorthand': ['error', 'always'],

            /* ==================
             *      STYLISTIC
             * ================== */
            /**
             * Ruleset orienté sur le style et la lisibilité du code.
             * 21 règles.
             * Voir liste et explications ici : https://typescript-eslint.io/rules/
             */
            ...tseslint.configs.stylistic.rules,
            /**
             * Cette règle oblige à utiliser des interfaces au lieu de types.
             * Ce monorepo suit la règle inverse : uniquement des types sauf
             * si une interface est nécessaire.
             */
            '@typescript-eslint/consistent-type-definitions': 'off',

            /* ==================
             *      UNICORN
             * ================== */
            /**
             * Unicorn recommended set enables 125 linter rules targeting good practices.
             * Those rules are quite restrictive thus enforce a good code quality.
             * See https://github.com/sindresorhus/eslint-plugin-unicorn
             * for the list of rules and explanations.
             */
            ...unicornPlugin.configs.recommended.rules,
            /**
             * Abreviations can be useful to improve code readability.
             * For instance for naming elements in array methods like `map`
             * or for known abbreviations (ex: `ctx`, `ref`, `err`, ...).
             */
            'unicorn/prevent-abbreviations': 'off',
            /**
             * `null` cannot always be replaced by `undefined`. `undefined` means
             * a value is not defined, while `null` means a value is defined but is "nothing".
             * Moreover, JSON treats `undefined` as "skip this property"
             * while `null` means "this property has a non-value".
             * This rule is debated (see: https://github.com/sindresorhus/meta/discussions/7)
             */
            'unicorn/no-null': 'off',
            'unicorn/filename-case' : [
                'error',
                {
                    cases: {
                        kebabCase: true,
                        pascalCase: true
                    }
                }
            ],
            /* ==================
             *      SECURITY
             * ================== */
            /**
             * The security plugin helps detect potential security issues.
             * Finds a lot of false positives that need to be manually checked.
             * 14 rules.
             * See: https://github.com/nodesecurity/eslint-plugin-security
             */
            ...securityPlugin.configs.recommended.rules,
            /**
             * Detects a lot a false positives by forbidding any square bracket access
             * to an object.
             */
            'security/detect-object-injection': 'off',

            /* ==================
             *      SONARJS
             * ================== */
            /**
             * Ruleset to detect code smells and bugs.
             * 32 rules.
             * See list and explanations here: https://github.com/SonarSource/eslint-plugin-sonarjs
             */
            ...sonarjs.configs.recommended.rules,
            /**
             * Redundant with typescript-eslint/no-unused-vars and no configurable
             * to accept variables prefixed with '_'.
             */
            'sonarjs/no-unused-vars': 'off',
        },
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        plugins: {
            boundaries: boundariesPlugin,
        },
        settings: {
            'boundaries/dependency-nodes': ['import', 'export'],
            'boundaries/elements': [
                {
                    type: 'module',
                    mode: 'full',
                    pattern: 'apps/*/*/**',
                    capture: ['appName', 'moduleName'],
                },
                {
                    type: 'app-index',
                    mode: 'full',
                    pattern: 'apps/*/index.ts',
                    capture: ['appName'],
                },
                {
                    type: 'common',
                    mode: 'full',
                    pattern: 'common/**',
                },
            ],
            'boundaries/include': ['apps/**/*.ts', 'common/**/*.ts'],
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            /* ==================
             *      BOUNDARIES
             * ================== */
            /**
             * Boundaries permet de créer des règles pour séparer les différentes modules
             * d'un projet et leur affecter des permissions.
             * Voir : https://github.com/javierbrea/eslint-plugin-boundaries/blob/master/docs/rules/external.md
             */
            ...boundariesPlugin.configs.recommended.rules,
            /**
             * Interdit les importations de modules inconnus.
             */
            'boundaries/no-unknown': ['error'],
            /**
             * Interdit les importations de fichiers inconnus.
             */
            'boundaries/no-unknown-files': ['error'],
            /**
             * Interdit les importations d'une app à une autre ainsi que d'un module
             * à un autre au sein d'une même app.
             * Les seules importations autorisées sont les importations relatives au
             * même module, les importations d'un module nommé `shared` ou `generated`
             * et les importations relatives au package `common`.
             */
            'boundaries/no-private': 'off',
            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    rules: [
                        {
                            from: 'module',
                            allow: [
                                [
                                    'module',
                                    {
                                        appName: '${from.appName}',
                                        moduleName: '${from.moduleName}',
                                    },
                                ],
                            ],
                        },
                        {
                            from: 'module',
                            allow: [
                                [
                                    'module',
                                    {
                                        appName: '${from.appName}',
                                        moduleName: '{shared,generated}',
                                    },
                                ],
                            ],
                        },
                        { from: 'module', allow: ['common'] },
                        { from: 'common', allow: ['common'] },
                        {
                            from: 'app-index',
                            allow: [['module', { appName: '${from.appName}' }]],
                        },
                    ],
                },
            ],
        },
    },
    {
        /**
         * Interdiction des importations `@urmet/common` dans le package `common`.
         * Les imports au sein d'un package doivent être relatifs.
         */
        files: ['common/**/*.{ts,tsx,js,jsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['@urmet/common/*'],
                },
            ],
        },
    },
]