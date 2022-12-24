/**
 * @type {import('@types/prettier').Options}
 */
module.exports = {
    useTabs: false,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 85,
    plugins: [
        require('prettier-plugin-astro'),
        require('prettier-plugin-tailwindcss')
    ],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro'
            }
        }
    ]
};
