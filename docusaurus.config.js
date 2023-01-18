// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const commonDocsOptions = {
  breadcrumbs: false,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  editUrl:
    'https://github.com/fleek-network/fleek-network-docs/edit/main/',
};

const commonNavbarItems = [{
  to: 'docs',
  label: 'Documentation',
  position: 'left',
},
{
  to: 'blog',
  label: 'Engineering',
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
}];

const commonDiscord = 'https://discord.gg/fleekxyz';
const commonTwitter = 'https://twitter.com/fleek_net';
const commonHome = 'https://fleek.network';
const commonCompanyUrl = 'https://fleek.xyz';

const copyright = `Copyright © ${new Date().getFullYear()} Fleek`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fleek Network',
  tagline: '',
  url: 'https://docs.fleek.network',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico?202301091316',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fleek-network', // Usually your GitHub org/user name.
  projectName: 'fleek-network-docs', // Usually your repo name.
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
        gtag: {
          trackingID: 'G-GPHQQEZ1SP',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata:{
        description: 'Welcome to the docs of Fleek Network, a lightning fast and decentralized CDN built to supercharge web3.',
        og:image: 'https://storageapi.fleek.co/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/documentation.png',
        twitter:card: 'summary_large_image',
        twitter:image: 'https://storageapi.fleek.co/27a60cdd-37d3-480c-ae88-3ad4ca886b13-bucket/imgs/documentation.png',
      },      
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
          ...commonNavbarItems,
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Resources',
            items: [
              ...commonNavbarItems,
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: commonDiscord,
              },
              {
                label: 'Twitter',
                href: commonTwitter,
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'Home',
                href: commonCompanyUrl,
              },
              {
                label: 'Contact us',
                href: commonDiscord,
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/fleek-network',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} Fleek. All rights reserved.`,
        logo: {
          alt: 'Fleek Network',
          src: 'img/logo+named.svg?202301101154',
          href: 'https://fleek.network',
          width: 160
        },
      },
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: '1RFAB49JUD',
        // Public API key
        apiKey: '76d5e1152fb478c8a97adf44e3cbe424',
        indexName: 'fleekNetworkDocs',
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
