import * as React from "react";

export interface FavoritesContextInterface {
    favorites: string[],
    setFavorites(val: string[]):void
}

export const defaultContext: FavoritesContextInterface = {
    favorites: [],
    setFavorites(val: string[]): void {}
};

export const FavoritesContext = React.createContext<FavoritesContextInterface>(defaultContext);

FavoritesContext.displayName = "FavoritesContext";