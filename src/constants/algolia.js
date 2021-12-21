const ALGOLIA_APLICATION_ID = 'XIMRNVJLQ7';
const ALGOLIA_APLICATION_KEY = '79d8a9e0e13c7f9e65ce7cd393f39934';
const ALGOLIA_INDEX_NAME = 'Community_articles_staging';
const VERSION = 1;

const randomBase = '.algolianet.com';

const HOSTS = {
  default: '-dsn.algolia.net',
  random: [
    `-1${randomBase}`,
    `-2${randomBase}`,
    `-3${randomBase}`,
  ],
};

export {
  ALGOLIA_APLICATION_ID,
  ALGOLIA_APLICATION_KEY,
  ALGOLIA_INDEX_NAME,
  VERSION,
  HOSTS,
};
