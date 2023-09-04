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
    elementsURL: 'http://localhost:4208',
  },
  insurance: {
    quoteAndBuyURL: 'http://localhost:4256',
    elementsURL: 'http://localhost:4207',
    demoSiteCode: '08db6c19-8664-4f14-817a-e8f2b28fca36',
    demoSidebarCode: '6c8f947d-e1a5-434a-a27e-cc405b7a4f4a',
  },
  onboarding: {
    onboardingURL: 'http://localhost:4201',
  },
  environmentName: 'local',
  uxAPIUrl: 'http://localhost:32213/api',
};
