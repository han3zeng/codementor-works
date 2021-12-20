import { useContext } from 'react';
import { FavoritesContext } from '../contexts/favorites';

function useFavorites() {
  const context = useContext(FavoritesContext);
  return {
    ...context,
  };
}

export default useFavorites;
