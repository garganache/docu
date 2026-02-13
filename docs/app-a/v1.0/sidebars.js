/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '👥 User Guide',
      items: [
        'user-guide/getting-started',
        'user-guide/features',
        'user-guide/faq',
      ],
    },
    {
      type: 'category',
      label: '🛠️ Technical',
      items: [
        'technical/configuration',
        'technical/deployment',
        'technical/api-reference',
      ],
    },
  ],
};

export default sidebars;
