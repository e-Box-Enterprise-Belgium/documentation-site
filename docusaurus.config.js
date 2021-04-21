/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  title: 'e-Box Technical Documentation Site',
  tagline: "Reach Belgium's Enterprises through the official channels.",
  url: 'https://dev.eboxenterprise.be',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'ebox', // Usually your GitHub org/user name.
  projectName: 'eboxenterprise-integration-site', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    sidebarCollapsible: false,
    navbar: {
      logo: {
        alt: 'Ebox Enterprise Integration Site',
        src: 'img/logo_ebox.svg',
      },
      links: [
        {to: 'docs/introduction', label: 'Documentation', position: 'right'},
        {to: 'blog', label: 'Blog', position: 'right'},
        {href: "https://github.com/e-Box-Enterprise-Belgium", label:"Github", position: 'right'}
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'e-Box ecosystem',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/e-Box-Enterprise-Belgium',
            },
            {
              label: 'Info site',
              href: 'https://www.eboxenterprise.be',
            },
          ],
        },
        {
          title: 'Information',
          items: [
            {
              label: 'Conditions for re-use (in french)',
              href: 'https://www.eboxenterprise.be/fr/open-data.html',
              language:"french"
            },
            {
              label: 'Accessibility Statement',
              href: 'https://www.onssrszlss.fgov.be/sites/default/files/binaries/assets/linkfooter/accessibility_statement_nsso.pdf',
            },
            {
              label: 'Personal Data',
              href: 'https://www.eboxenterprise.be/en/documents/pdf/gdpr-enterprise-noss-E.pdf',
            },
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'Contact form',
              href: 'https://www.socialsecurity.be/site_fr/employer/general/contactcenter/index.htm?targetApplics=eboxEntreprise',
            },
          ],
        },
      ],
      copyright: `© socialsecurity.be`,
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/be-smals-thim/documentation-site/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
        sitemap:{
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'weekly',
          priority: 0.5,
        },
      },
    ],
  ],
};
