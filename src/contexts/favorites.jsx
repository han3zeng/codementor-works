import React, { useReducer, createContext } from 'react';

const FavoritesContext = createContext({
  articles: [],
  dispatch: () => {},
});

const initialState = {
  favorites: [],
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'addArticle':
      return [...state, payload];
    case 'deleteArticle':
      return state.filter((article) => article.id !== payload.id);
    case 'reset':
      return [];
    default:
      throw new Error();
  }
}

function FavoritesProvider({
  children,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FavoritesContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export {
  FavoritesProvider,
  FavoritesContext,
};
