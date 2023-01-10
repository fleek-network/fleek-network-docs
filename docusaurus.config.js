// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const commonDocsOptions = {
  breadcrumbs: false,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  editUrl:
    'https://github.com/fleek-network/fleek-network-docs',
};

const copyright = `Copyright © ${new Date().getFullYear()} Fleek`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fleek Network',
  tagline: 'TODO',
  url: 'https://docs.fleek-network',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico?202301091316',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fleekhq', // Usually your GitHub org/user name.
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
          routeBasePath: '/docs',
          breadcrumbs: true,
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          path: 'blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
          feedOptions: {
            type: 'all',
            copyright,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        logo: {
          alt: 'Fleek',
          src: 'img/logo.png?2023091241',
        },
        items: [
          {
            to: 'blog',
            label: 'Blog',
            position: 'left',
          },
          {
            to: 'docs',
            label: 'Documentation',
            position: 'left',
          },
          {
            to: 'guides',
            label: 'Guides',
            position: 'left',
            activeBasePath: 'guides',
          },
          {
            to: 'reference',
            label: 'Reference',
            position: 'left',
            activeBasePath: 'reference',
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
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: '3HJT8PSC35',
        // Public API key
        apiKey: '633800ca1e949856c20a92711132900c',
        indexName: 'docta_poc',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
    }),
    plugins: [
      [
        'content-docs',
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        ({
          id: 'guides',
          path: 'guides',
          routeBasePath: '/guides',
          // `undefined` to auto-generate
          sidebarPath: undefined,
          ...commonDocsOptions,
        }),
      ],
      [
        'content-docs',
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        ({
          id: 'reference',
          path: 'reference',
          routeBasePath: '/reference',
          // `undefined` to auto-generate
          sidebarPath: undefined,
          ...commonDocsOptions,
        }),
      ],
    ],
};

module.exports = config;
