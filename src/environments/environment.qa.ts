export const environment = {
  openBanking: {
    UK: {
      authURL:
        'https://identityqa.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apiqa.certua.io/daas/app/token',
    },
    AU: {
      authURL:
        'https://identityqa-au.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apiqa-au.certua.io/daas/app/token',
    },
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/open-banking-elements/qa/current',
  },
  insurance: {
    quoteAndBuyURL:
      'https://cdn.certua.io/ux-micro-frontends/quote-and-buy/qa/current',
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/insurance-elements/qa/current',
    demoSiteCode: '08db6c19-8664-4f14-817a-e8f2b28fca36',
  },
  environmentName: 'qa',
};
