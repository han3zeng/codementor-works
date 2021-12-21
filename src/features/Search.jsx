import React, { useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { debounce, compose } from '../utils/lodash';
import ResultRow from '../components/ResultRow';
import useArticles from '../hooks/useArticles';

const Conatiner = styled.div`
  > input {
    min-width: 180px;
  }
`;

function Search() {
  const [
    search,
    {
      loading,
      state,
      dispatch,
    },
  ] = useArticles();
  const { favoriteSet, searchResult } = state;
  const { term, result } = searchResult;

  const onChangeHandler = debounce((e) => {
    const { value } = e.target;
    search({
      query: value,
    });
  }, 500);

  const onSaveToggleHandler = useCallback(({
    type,
    payload,
  }) => {
    dispatch({
      type,
      payload,
    })
  }, []);

  const rows = useMemo(() => result.map(({
    title,
    categories,
    id,
    author_name: authorName,
  }) => (
    <ResultRow
      key={id}
      id={id}
      authorName={authorName}
      title={title}
      categories={categories}
      onSaveToggleHandler={onSaveToggleHandler}
      saved={favoriteSet[id]}
    />
  )), [searchResult, favoriteSet]);

  const content = (() => {
    if (term !== '' && result.length === 0) {
      return <p>No Result</p>;
    }
    return rows;
  })();

  return (
    <Conatiner>
      <input
        defaultValue={term}
        onChange={onChangeHandler}
      />
      {loading && <p>... Loading</p>}
      {!loading && content}
    </Conatiner>
  );
}

export default Search;
