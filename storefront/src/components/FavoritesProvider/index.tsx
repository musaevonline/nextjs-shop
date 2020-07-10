import React from "react";
import {FavoritesContextInterface, FavoritesContext} from "@temp/components/FavoritesProvider/context";
import useLocalStorage from "@temp/hooks/useLocalStorage";
import {FAVORITES_STORAGE_KEY} from "@temp/core/constants";

const FavoritesProvider: React.FC = ({ children }) => {
    const [favorites, setFavorites] = useLocalStorage<string[]>(FAVORITES_STORAGE_KEY, []);

    const context:FavoritesContextInterface = {
        favorites,
        setFavorites
    };

    return (
        <FavoritesContext.Provider value={context}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesProvider;