import { useDispatch, useSelector } from 'react-redux'
import { addToFavoritesAsync, removeFromFavoritesAsync } from '../../../actions'
import styles from './styles.module.scss'
import { selectUserId, selectUserFavorites } from '../../../selectors'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Like = ({ productId }) => {
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const favorites = useSelector(selectUserFavorites)
	const navigate = useNavigate()

	const [isAdded, setIsAdded] = useState(false)

	useEffect(() => {
		setIsAdded(favorites.some((el) => el.id === productId))
	}, [favorites, productId])

	const addRemoveToFavorites =  () => {
		if (!userId) navigate('/login')

		if (isAdded) {
			 dispatch(removeFromFavoritesAsync(userId, productId))
		} else {
			 dispatch(addToFavoritesAsync(userId, productId))
		}
	}

	return (
		<button className={styles.iconButton} onClick={addRemoveToFavorites}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<path
					d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
       2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
       C13.09 3.81 14.76 3 16.5 3
       19.58 3 22 5.42 22 8.5
       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
					fill={isAdded ? 'red' : 'black'}
				/>
			</svg>
		</button>
	)
}
