import { useContext, useState, useEffect } from 'react';
import { ArticlesContext } from '../contexts/articles';
import {
  SET_SEARCH_RESULT,
} from '../constants';
import {
  ALGOLIA_APLICATION_ID,
  ALGOLIA_APLICATION_KEY,
  ALGOLIA_INDEX_NAME,
  VERSION,
  HOSTS,
} from '../constants/algolia';
import retry from '../utils/retry';

const maxRetries = 3;
const optionsBase = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Algolia-Application-Id': ALGOLIA_APLICATION_ID,
    'X-Algolia-API-Key': ALGOLIA_APLICATION_KEY,
  },
};

async function fetchFromAlgolia({
  query,
  signal,
  count,
}) {
  const options = {
    ...optionsBase,
    body: JSON.stringify({
      query,
    }),
    signal,
  };

  const host = (() => {
    if (count === maxRetries) {
      return HOSTS.default;
    }
    return HOSTS.random[Math.floor(Math.random() * HOSTS.random.length)];
  })();
  const url = `https://${ALGOLIA_APLICATION_ID}${host}/${VERSION}/indexes/${ALGOLIA_INDEX_NAME}/query`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result?.hits || [];
  } catch (e) {
    return Promise.reject(new Error(`something bad happened: ${count}`));
  }
}

function useArticles() {
  const { state, dispatch } = useContext(ArticlesContext);
  const [loading, setLoading] = useState(false);
  const [currentSignal, setSignal] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setSignal(signal);
    return () => {
      controller.abort();
    };
  }, []);

  async function search({
    query,
  }) {
    setLoading(true);
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

    try {
      const result = await retry(fetchFromAlgolia, maxRetries, {
        query,
        signal: currentSignal,
        count: maxRetries,
      });
      if (!result) {
        return;
      }

      dispatch({
        type: SET_SEARCH_RESULT,
        payload: {
          result,
          term: query,
        },
      });
      setLoading(false);
    } catch (e) {
      console.log('final error: ', e);
      setLoading(false);
    }
  }

  return [
    search,
    {
      loading,
      state,
      dispatch,
    },
  ];
}

export default useArticles;
