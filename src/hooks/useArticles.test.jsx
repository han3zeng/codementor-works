import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useArticles from './useArticles';
import { ArticlesProvider, initialState } from '../contexts/articles';
import {
  ALGOLIA_APLICATION_ID,
  ALGOLIA_INDEX_NAME,
  VERSION,
  HOSTS,
} from '../constants/algolia';

const getAlgoliaURL = (host) => `https://${ALGOLIA_APLICATION_ID}${host}/${VERSION}/indexes/${ALGOLIA_INDEX_NAME}/query`;

const DEFAULT_ALGOLIA_URL = getAlgoliaURL(HOSTS.default);

const ALGOLIA_URL_CANDIDATES = [
  getAlgoliaURL(HOSTS.random[0]),
  getAlgoliaURL(HOSTS.random[1]),
  getAlgoliaURL(HOSTS.random[2]),
];

const mockFetchResult = {
  hits: [{ test: 'test' }],
};

const expectedResult = {
  searchResult: {
    term: 'test',
    result: mockFetchResult.hits,
  },
  favorites: [],
  favoriteSet: {},
};

const requestedUrl = [];

beforeAll(() => {
  let count = 0;
  global.fetch = jest.fn((url) => {
    requestedUrl.push(url);
    if (count === 0) {
      count += 1;
      return Promise.reject(new Error('something went worng during reques'));
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockFetchResult),
    });
  });
});

const wrapper = ({ children }) => (
  <ArticlesProvider value={initialState}>{children}</ArticlesProvider>
);

describe('useArticles search: ', () => {
  test('check useArticles search function and state result', async () => {
    const { result } = renderHook(() => useArticles(), { wrapper });
    await act(async () => {
      const search = result.current[0];
      await search({
        query: 'test',
      });
    });
    expect(result.current[1].state).toStrictEqual(expectedResult);
  });

  test('check associated algolia url in each retry-equest is correct', async () => {
    expect(requestedUrl[0]).toBe(DEFAULT_ALGOLIA_URL);
    expect(ALGOLIA_URL_CANDIDATES).toEqual(expect.arrayContaining([requestedUrl[1]]));
  });
})

afterAll(() => {
  delete global.fetch;
});
