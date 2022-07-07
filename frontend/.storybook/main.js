const { addons, mockChannel } = require('@storybook/addons');
const path = require('path');

addons.setChannel(mockChannel());

module.exports = {
  "stories": [
    "../src/storybook/pages/WelcomePage.stories.mdx",
    "../src/storybook/pages/IconographyPage.stories.mdx",
    "../src/storybook/pages/DesignTokensPage.stories.mdx",
    "../src/components/atoms/**/*.stories.mdx",
    "../src/components/molecules/**/*.stories.mdx",
    "../src/components/organisms/**/*.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-console",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "webpackFinal": async (config) => {
    config.module.rules.push({
      test: /\,css&/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer')
            ]
          }
        }
      ],
      include: path.resolve(__dirname, '../'),
    })
    return config
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}