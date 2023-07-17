export const environment = {
  openBanking: {
    UK: {
      authURL:
        'https://identitydev.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apidev.certua.io/daas/app/token',
    },
    AU: {
      authURL:
        'https://identitydev-au.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apidev-au.certua.io/daas/app/token',
    },
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/open-banking-elements/dev/current',
  },
  insurance: {
    quoteAndBuyURL:
      'https://cdn.certua.io/ux-micro-frontends/quote-and-buy/dev/current',
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/insurance-elements/dev/current',
    demoSiteCode: '08db6c19-8664-4f14-817a-e8f2b28fca36',
  },
  onboarding: {
    onboardingURL:
      'https://cdn.certua.io/ux-micro-frontends/onboarding/dev/current',
  },
  environmentName: 'dev',
};
