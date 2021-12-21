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
} from '../constants/algolia';

async function fetchFromAlgolia({
  query,
  signal,
}) {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Algolia-Application-Id': ALGOLIA_APLICATION_ID,
      'X-Algolia-API-Key': ALGOLIA_APLICATION_KEY,
    },
    body: JSON.stringify({
      query,
    }),
    signal,
  };
  const url = `https://${ALGOLIA_APLICATION_ID}-dsn.algolia.net/${VERSION}/indexes/${ALGOLIA_INDEX_NAME}/query`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result?.hits || [];
  } catch (e) {
    return null;
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

    const result = await fetchFromAlgolia({
      query,
      signal: currentSignal,
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
