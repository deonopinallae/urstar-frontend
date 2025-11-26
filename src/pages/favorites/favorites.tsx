import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { selectUserFavorites } from '../../selectors'
import { Card } from '../../components/ui'

export const Favorites = () => {
	const favorites = useSelector(selectUserFavorites)
	return (
		<section className={`${styles.favorites} container`}>
            <h2 className={`${styles.favorites__title} text-center`}>your favorites</h2>
			<div className={`${styles.favorites__list} grid items-center`}>
				{Array.isArray(favorites) && favorites.length === 0 ? (
					<div className="text-center min-w-full">
						no products :(
					</div>
				) : (
					favorites.map(({ id, ...productData }) => (
						<Card key={Math.random()} {...{ id, productData }} />
					))
				)}
			</div>
		</section>
	)
}
