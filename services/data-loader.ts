import type { UserType } from './magento';

type UserDataModule =
  | typeof import('../dummyData/particulier-without-zeno')
  | typeof import('../dummyData/interne-urmet')
  | typeof import('../dummyData/installateur-premium-with-site')
  | typeof import('../dummyData/installateur-non-premium-sans-site')
  | typeof import('../dummyData/promoteur-be');

/**
 * Dynamically load data based on user type
 */
export async function loadDataForUserType(userType: UserType): Promise<UserDataModule> {
  switch (userType) {
  case 'particulierWithoutZeno': {
    return await import('../dummyData/particulier-without-zeno');
  }
  case 'interneUrmet': {
    return await import('../dummyData/interne-urmet');
  }
  case 'InstallateurPremiumWithSite': {
    return await import('../dummyData/installateur-premium-with-site');
  }
  case 'installateurNonPremiumSansSite': {
    return await import('../dummyData/installateur-non-premium-sans-site');
  }
  case 'promoteurBe': {
    return await import('../dummyData/promoteur-be');
  }
  default: {
    return await import('../dummyData/particulier-without-zeno');
  }
  }
}
