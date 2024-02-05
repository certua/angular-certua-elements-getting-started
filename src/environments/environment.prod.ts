export const environment = {
  openBanking: {
    UK: {
      authURL:
        'https://identity.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://api.certua.io/daas/app/token',
      subTenantReference: '',
      adviserReference: '',
    },
    AU: {
      authURL:
        'https://identity-au.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://api-au.certua.io/daas/app/token',
      subTenantReference: '',
      adviserReference: '',
    },
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/open-banking-elements/prod/{version}',
  },
  insurance: {
    quoteAndBuyURL:
      'https://cdn.certua.io/ux-micro-frontends/quote-and-buy/prod/{version}',
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/insurance-elements/prod/{version}',
    demoSiteCode: '08db6c19-8664-4f14-817a-e8f2b28fca36',
    demoSidebarCode: '08db56d8-079c-4244-8869-41a7b35771ae',
  },
  onboarding: {
    onboardingURL:
      'https://cdn.certua.io/ux-micro-frontends/onboarding/prod/{version}',
  },
  environmentName: 'prod',
  uxAPIUrl: 'https://ux-api.certua.io/api',
  docsUrl: 'https://docs.certua.io/docs',
};
