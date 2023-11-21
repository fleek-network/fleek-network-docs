// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require('prism-react-renderer/themes/github');
const { themes } = require('prism-react-renderer');
const darkCodeTheme = themes.dracula;

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
  to: 'guides',
  label: 'Guides',
  position: 'left',
},
{
  to: 'references',
  label: 'References',
  position: 'left',
},
{
  href: 'https://blog.fleek.network',
  label: 'Blog',
  position: 'left',
  target: '_blank',
},
{
  href: 'https://github.com/fleek-network/',
  label: 'Github',
  position: 'left',
  target: '_blank',
}];

const commonDiscord = 'https://discord.gg/fleek';
const commonTwitter = 'https://twitter.com/fleek_net';
const commonHome = 'https://fleek.network';
const commonCompanyUrl = 'https://fleek.network/';

const copyright = `Copyright © ${new Date().getFullYear()} Fleek`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fleek Network Docs | Decentralized Edge Platform',
  tagline: 'Welcome to the docs of Fleek Network, a decentralized edge platform for building web3 edge services.',
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
  trailingSlash: true,

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
          sidebarCollapsed: false,
          sidebarCollapsible: false,
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
        sitemap: {
          changefreq: 'weekly',
          priority: 0.9,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/documentation.png',
      metadata:[{
        description: 'Welcome to the docs of Fleek Network, a decentralized edge platform for building edge services.'}],      
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
        appId: 'ZLPPXSKTFE',
        // Public API key
        apiKey: '33ed5b78ac12317e4243d3f44874cbc8',
        indexName: 'fleek',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
        schedule: 'every 1 day at 6:00 pm',
      },
    }),
    plugins: [
      [
        '@docusaurus/plugin-google-tag-manager',
        {
          containerId: 'GTM-PC422SF',
        },
      ],
      [
        'content-docs',
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        ({
          id: 'guides',
          path: 'guides',
          routeBasePath: '/guides',
          // `undefined` to auto-generate
          sidebarPath: undefined,
          sidebarCollapsed: false,
          sidebarCollapsible: false,
          ...commonDocsOptions,
        }),
      ],
      [
        'content-docs',
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        ({
          id: 'references',
          path: 'references',
          routeBasePath: '/references',
          // `undefined` to auto-generate
          sidebarPath: undefined,
          sidebarCollapsed: true,
          sidebarCollapsible: true,
          ...commonDocsOptions,
        }),
      ],
    ],    
};

module.exports = config;
