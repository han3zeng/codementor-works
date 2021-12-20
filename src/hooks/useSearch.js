import { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import useFavorites from './useFavorites';
import {
  SET_SEARCH_RESULT,
} from '../constants';

const client = algoliasearch('XIMRNVJLQ7', '79d8a9e0e13c7f9e65ce7cd393f39934');
const index = client.initIndex('Community_articles_staging');

function useSearch() {
  const { state, dispatch } = useFavorites();
  const [loading, setLoading] = useState(false);
  const { searchResult } = state;

  async function search({
    query,
  }) {
    setLoading(true);
    try {
      if (!query) {
        dispatch({
          type: SET_SEARCH_RESULT,
          payload: {
            term: '',
            result: [],
          },
        });
        setLoading(false);
        return;
      }
      const result = await index.search(query);
      dispatch({
        type: SET_SEARCH_RESULT,
        payload: {
          result: result.hits,
          term: query,
        },
      });
      setLoading(false);
    } catch (e) {
      console.log('error: ', e);
      setLoading(false);
    }
  }

  return [
    search,
    {
      data: searchResult,
      loading,
    },
  ];
}

export default useSearch;
