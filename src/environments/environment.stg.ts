export const environment = {
  openBanking: {
    UK: {
      authURL:
        'https://identitystg.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apistg.certua.io/daas/app/token',
      adviserReference: '175',
      subTenantReference: '12499',
    },
    AU: {
      authURL:
        'https://identitystg-au.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apistg-au.certua.io/daas/app/token',
      adviserReference: '9089',
      subTenantReference: '12499',
    },
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/open-banking-elements/stg/v1.0.15-pre',
  },
  insurance: {
    quoteAndBuyURL:
      'https://cdn.certua.io/ux-micro-frontends/quote-and-buy/stg/v1.1.18-pre',
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/insurance-elements/stg/v1.0.9-pre',
    demoSiteCode: '4ebf9577-dca0-4ad4-abd1-b4f48327a85a',
    demoSidebarCode: '95839381-9414-494c-a822-814725c4f60e',
  },
  onboarding: {
    onboardingURL:
      'https://cdn.certua.io/ux-micro-frontends/onboarding/stg/v3.1.18-pre',
  },
  environmentName: 'stg',
  uxAPIUrl: 'https://ux-api-stg.certua.io/api',
};
