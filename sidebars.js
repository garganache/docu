/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    'versions',
    {
      type: 'category',
      label: '📱 Yields for Performance',
      collapsed: false,
      items: [
        'app-a/intro',
        {
          type: 'category',
          label: 'v2.13 (Latest)',
          link: {
            type: 'doc',
            id: 'app-a/v1.0/intro',
          },
          items: [
            {
              type: 'category',
              label: '📖 Concepts',
              items: [
                'app-a/v1.0/concepts/glossary',
                'app-a/v1.0/concepts/workflow',
                'app-a/v1.0/concepts/library-concepts',
                'app-a/v1.0/concepts/changelog',
              ],
            },
            {
              type: 'category',
              label: '👥 User Guide',
              items: [
                'app-a/v1.0/user-guide/features',
                'app-a/v1.0/user-guide/getting-started',
                'app-a/v1.0/user-guide/artifact-management',
                'app-a/v1.0/user-guide/specification-creation',
                'app-a/v1.0/user-guide/instance-management',
                'app-a/v1.0/user-guide/tagging-strategy',
                'app-a/v1.0/user-guide/automation-scheduling',
                'app-a/v1.0/user-guide/object-operations',
                'app-a/v1.0/user-guide/folder-management',
                'app-a/v1.0/user-guide/user-profile',
                'app-a/v1.0/technical/resource-definition',
                'app-a/v1.0/technical/python-library-modules',
                'app-a/v1.0/technical/python-session-api',
                'app-a/v1.0/technical/python-io-operations',
                'app-a/v1.0/technical/python-tag-management',
                'app-a/v1.0/user-guide/end-to-end-examples',
                'app-a/v1.0/user-guide/known-limitations',
                'app-a/v1.0/user-guide/support-contact',
                'app-a/v1.0/user-guide/faq',
              ],
            },
            {
              type: 'category',
              label: '🛠️ Technical',
              items: [
                'app-a/v1.0/technical/admin-guide',
                'app-a/v1.0/technical/configuration',
                'app-a/v1.0/technical/deployment',
                'app-a/v1.0/technical/api-reference',
              ],
            },
          ],
        },
      ],
    }
  ],
};

export default sidebars;
