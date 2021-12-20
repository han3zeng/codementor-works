import { useContext } from 'react';
import { FavoritesContext } from '../contexts/favorites';

function useFavorites() {
  const { state, dispatch } = useContext(FavoritesContext);
  return {
    state,
    dispatch,
  };
}

export default useFavorites;
