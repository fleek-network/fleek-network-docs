// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TODO',
  tagline: 'TODO',
  url: 'https://fleekhq.github.io/docta',
  baseUrl: '/docta/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Fleek', // Usually your GitHub org/user name.
  projectName: 'docta', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          breadcrumbs: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Fleek',
          src: 'img/logo.png?202210141832',
        },
        items: [
          {
            href: '/docs',
            label: 'Documentation',
            position: 'left',
          },
          {
            href: '/Guides',
            label: 'Guides',
            position: 'left',
          },
          {
            href: 'https://TODO',
            label: 'Feedback',
            position: 'right',
          },
          {
            href: 'https://TODO',
            label: 'Help',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Documents',
                to: '/docs',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/yVEcEzmrgm',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/plug_wallet',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'Home',
                href: 'https://fleek.co',
              },
              {
                label: 'Contact us',
                href: 'https://fleek.co',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/fleekhq',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fleek. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
