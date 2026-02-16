// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Multi-App Documentation',
  tagline: 'Unified documentation for all our applications',
  favicon: 'img/favicon.ico',

  url: 'https://docs.example.com',
  baseUrl: '/',

  organizationName: 'your-org',
  projectName: 'docu',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/garganache/docu/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Documentation',
        logo: {
          alt: 'Docs Logo',
          src: 'img/logo.svg',
          href: '/docs/',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'dropdown',
            label: 'Apps',
            position: 'left',
            items: [
              {
                label: 'Yields for Performance',
                to: '/docs/app-a/intro',
              }
            ],
          },
          {
            href: 'https://github.com/garganache/docu',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Applications',
            items: [
              {
                label: 'Yields for Performance',
                to: '/docs/app-a/intro',
              }
            ],
          },
          {
            title: 'Quick Links',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/',
              },
              {
                label: 'Version Index',
                to: '/docs/versions',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/garganache/docu',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Your Company. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
