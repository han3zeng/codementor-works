import React, { useMemo } from 'react';
import styled from 'styled-components';
import useFavorites from '../hooks/useFavorites';
import useSearch from '../hooks/useSearch';
import { debounce, compose } from '../utils/lodash';
import ResultRow from '../components/ResultRow';


const Conatiner = styled.div`
  > input {
    min-width: 180px;
  }
`;

function Search() {
  const [search, { data, loading }] = useSearch();

  const onChangeHandler = debounce((e) => {
    const { value } = e.target;
    search({
      query: value,
    });
  }, 500);

  const rows = useMemo(() => data.map(({
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
    />
  )), [data]);

  return (
    <Conatiner>
      <input
        onChange={onChangeHandler}
      />
      {loading && <p>... Loading</p>}
      {rows}
    </Conatiner>
  );
}

export default Search;
