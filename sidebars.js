/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'versions',
    {
      type: 'category',
      label: '📱 App A',
      collapsed: false,
      items: [
        'app-a/intro',
        {
          type: 'category',
          label: 'v1.0 (Latest)',
          link: {
            type: 'doc',
            id: 'app-a/v1.0/intro',
          },
          items: [
            {
              type: 'category',
              label: '👥 User Guide',
              items: [
                'app-a/v1.0/user-guide/getting-started',
                'app-a/v1.0/user-guide/features',
                'app-a/v1.0/user-guide/faq',
              ],
            },
            {
              type: 'category',
              label: '🛠️ Technical',
              items: [
                'app-a/v1.0/technical/configuration',
                'app-a/v1.0/technical/deployment',
                'app-a/v1.0/technical/api-reference',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '📱 App B',
      collapsed: true,
      items: [
        'app-b/intro',
        {
          type: 'category',
          label: 'v1.0 (Latest)',
          link: {
            type: 'doc',
            id: 'app-b/v1.0/intro',
          },
          items: [
            'app-b/v1.0/user-guide/getting-started',
            'app-b/v1.0/technical/deployment',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '📱 App C',
      collapsed: true,
      items: [
        'app-c/intro',
        {
          type: 'category',
          label: 'v1.0 (Latest)',
          link: {
            type: 'doc',
            id: 'app-c/v1.0/intro',
          },
          items: [
            'app-c/v1.0/user-guide/getting-started',
            'app-c/v1.0/technical/deployment',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
