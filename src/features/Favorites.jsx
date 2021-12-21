import React, { useCallback } from 'react';
import useArticles from '../hooks/useArticles';
import ResultRow from '../components/ResultRow';


function Favorites() {
  const {
    state,
    dispatch,
  } = useArticles()[1];

  const onSaveToggleHandler = useCallback(({
    type,
    payload,
  }) => {
    dispatch({
      type,
      payload,
    })
  }, []);

  const { favorites } = state;
  if (!favorites || !Array.isArray(favorites)) {
    return null;
  }
  const content = favorites?.map(({
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
      saved
    />
  ));
  return (
    <>
      {content}
    </>
  );
}

export default Favorites;
