import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'
import { request } from '../../../utils'
import { useDispatch } from 'react-redux'
import { removeFromCombiner } from '../../../actions'

export const CombinerProductsCard = ({
	combinerProductData: { _id: combinerProductId, imageUrl, category, price },
	addProductToScene,
	userId,
	onRemove,
}) => {
	const dispatch = useDispatch()
	const removeProductFromCombiner = async () => {
		await request(`/api/users/${userId}/combiner/${combinerProductId}`, 'DELETE')
		onRemove?.(combinerProductId)
	}
	return (
		<div key={combinerProductId} className={`${styles.combiner__cardsItem}`}>
			<div
				onClick={() => addProductToScene(category, imageUrl)}
				className={`${styles.combiner__cardsItemImage}`}
				style={{ backgroundImage: `url(${imageUrl})` }}
			>
				<p className="w-full h-full justify-center items-center">add to scene</p>
			</div>
			<div className={`${styles.combiner__cardsItemPrice}`}>{price}$</div>
			<Link to={`/products/${combinerProductId}`}>info</Link>
			<button onClick={removeProductFromCombiner} style={{ marginLeft: '15px' }}>
				delete
			</button>
		</div>
	)
}
