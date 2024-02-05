export const environment = {
  openBanking: {
    UK: {
      authURL:
        'https://identityqa.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apiqa.certua.io/daas/app/token',
      adviserReference: '77',
      subTenantReference: '12499',
    },
    AU: {
      authURL:
        'https://identityqa-au.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apiqa-au.certua.io/daas/app/token',
      adviserReference: '9163',
      subTenantReference: '12499',
    },
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/open-banking-elements/qa/current',
  },
  insurance: {
    quoteAndBuyURL:
      'https://cdn.certua.io/ux-micro-frontends/quote-and-buy/qa/current',
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/insurance-elements/qa/current',
    demoSiteCode: '950d58ac-b445-4370-9131-84f6e93fb32c',
    demoSidebarCode: '1bc578b2-c6ba-4519-a1dc-e2d5670ce1e9',
  },
  onboarding: {
    onboardingURL:
      'https://cdn.certua.io/ux-micro-frontends/onboarding/qa/current',
  },
  environmentName: 'qa',
  uxAPIUrl: 'https://ux-api-qa.certua.io/api',
  docsUrl: 'https://docsqa.certua.io/docs',
};
