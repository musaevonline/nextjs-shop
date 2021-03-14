import React from 'react'
import { FavoritesContext } from '@temp/components/FavoritesProvider/context'
import useLocalStorage from '@temp/hooks/useLocalStorage'
import { FAVORITES_STORAGE_KEY } from '@temp/constants'

const FavoritesProvider: React.FC = ({ children }) => {
	const [favorites, setFavorites] = useLocalStorage<string[]>(
		FAVORITES_STORAGE_KEY,
		[]
	)

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				setFavorites
			}}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export default FavoritesProvider
