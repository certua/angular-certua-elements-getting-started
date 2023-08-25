export const environment = {
  openBanking: {
    UK: {
      authURL:
        'https://identitydev.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apidev.certua.io/daas/app/token',
      adviserReference: '77',
      subTenantReference: '12499',
    },
    AU: {
      authURL:
        'https://identitydev-au.certua.io/realms/Certua/protocol/openid-connect/token',
      apiURL: 'https://apidev-au.certua.io/daas/app/token',
      adviserReference: '9163',
      subTenantReference: '12499',
    },
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/open-banking-elements/dev/current',
  },
  insurance: {
    quoteAndBuyURL:
      'https://cdn.certua.io/ux-micro-frontends/quote-and-buy/dev/current',
    elementsURL:
      'https://cdn.certua.io/ux-micro-frontends/insurance-elements/dev/current',
    demoSiteCode: '88484503-ffd2-4b2b-86d0-f5c0de6d1395',
    demoSidebarCode: '6c8f947d-e1a5-434a-a27e-cc405b7a4f4a',
  },
  onboarding: {
    onboardingURL:
      'https://cdn.certua.io/ux-micro-frontends/onboarding/dev/current',
  },
  environmentName: 'dev',
  uxAPIUrl: 'https://api.dev.getbrisk.com/api',
};
