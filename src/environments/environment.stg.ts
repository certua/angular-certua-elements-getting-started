export const environment = {
  openBanking: {
    UK: {
      authURL:
        'https://identitystg.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apistg.certua.io/daas/app/token',
    },
    AU: {
      authURL:
        'https://identitystg-au.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apistg-au.certua.io/daas/app/token',
    },
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/open-banking-elements/stg/{version}',
  },
  insurance: {
    quoteAndBuyURL:
      'https://cdn.certua.io/ux-micro-frontends/quote-and-buy/stg/{version}',
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/insurance-elements/stg/{version}',
    demoSiteCode: '08db6c19-8664-4f14-817a-e8f2b28fca36',
  },
  environmentName: 'stg',
};
