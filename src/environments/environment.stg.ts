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
      'https://cdn.certua.io/ux-micro-frontends/open-banking-elements/stg/v1.0.10-pre',
  },
  insurance: {
    quoteAndBuyURL:
      'https://cdn.certua.io/ux-micro-frontends/quote-and-buy/stg/v1.1.12-pre',
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/insurance-elements/stg/v1.0.2-pre',
    demoSiteCode: '08db6c19-8664-4f14-817a-e8f2b28fca36',
  },
  environmentName: 'stg',
};
