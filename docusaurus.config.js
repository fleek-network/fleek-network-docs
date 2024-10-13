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

const commonDiscord = 'https://discord.gg/fleek';
const commonTwitter = 'https://twitter.com/fleek_net';
const commonHome = 'https://fleek.network';
const commonCompanyUrl = 'https://fleek.network/';
const fleekXyzUrl = 'https://fleek.xyz/';
const fleekNetworkGithubUrl = 'https://github.com/fleek-network';
const copyright = `Copyright © ${new Date().getFullYear()} Fleek`;

const commonNavbarItems = [{
  href: commonHome,
  label: 'Explainer',
  position: 'left',
}, 
{
  to: 'docs',
  label: 'Documentation',
  position: 'left',
},
{
  href: 'https://blog.fleek.network',
  label: 'Writings',
  position: 'left',
  target: '_blank',
},
{
  href: commonHome,
  label: 'Resources',
  position: 'left',
}];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fleek Network Docs | Decentralized Edge Platform',
  tagline: 'Welcome to the docs of Fleek Network, a decentralized edge platform for building web3 edge services.',
  url: 'https://docs.fleek.network',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
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
          src: 'img/logo.svg?20241009',
        },
        items: [
          ...commonNavbarItems,
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            items: [
              {
                label: 'Discord',
                href: commonDiscord,
              },
              {
                label: 'X',
                href: commonTwitter,
              },
            ],
          },
          {
            items: [
              {
                label: 'Whitepaper',
                to: '/docs/whitepaper',
              },
              {
                label: 'Documentation',
                href: '/docs',
              },
            ],
          },
          {
            items: [
              {
                label: 'Github',
                href: fleekNetworkGithubUrl,
              },
              {
                label: 'Fleek Platform',
                href: fleekXyzUrl,
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} Fleek. All rights reserved.`,
        logo: {
          alt: 'Fleek Network',
          src: 'img/logo.svg?202301101154',
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
