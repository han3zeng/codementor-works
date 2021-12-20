import React, { useReducer, createContext } from 'react';
import {
  SAVE_ARTICLE,
  UNSAVE_ARTICLE,
  SET_SEARCH_RESULT,
} from '../constants';

const FavoritesContext = createContext({
  searchResult: [],
  favorites: [],
  favoriteSet: {},
  dispatch: () => {},
});

const initialState = {
  searchResult: {
    term: '',
    result: [],
  },
  favorites: [],
  favoriteSet: {},
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SEARCH_RESULT: {
      const result = { ...state };
      result.searchResult = {
        term: payload.term,
        result: payload.result,
      };
      return result;
    }
    case SAVE_ARTICLE: {
      const result = { ...state };
      result.favorites = [...state.favorites, payload];
      result.favoriteSet = { ...state.favoriteSet, [payload.id]: true };
      return result;
    }
    case UNSAVE_ARTICLE: {
      const result = { ...state };
      result.favorites = state.favorites.filter((article) => article.id !== payload.id);
      result.favoriteSet = { ...state.favoriteSet };
      delete result.favoriteSet[payload.id];
      return result;
    }
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
