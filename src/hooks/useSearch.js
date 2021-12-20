import { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('XIMRNVJLQ7', '79d8a9e0e13c7f9e65ce7cd393f39934');
const index = client.initIndex('Community_articles_staging');

function useSearch() {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  async function search({
    query,
  }) {
    setLoading(true);
    try {
      if (!query) {
        setState({});
        setLoading(false);
        return;
      }
      const result = await index.search(query)
      setState(result);
      setLoading(false);
    } catch (e) {
      console.log('error: ', e);
      setLoading(false);
    }
  }

  return [
    search,
    {
      data: state?.hits || [],
      loading,
    },
  ];
}

export default useSearch;
