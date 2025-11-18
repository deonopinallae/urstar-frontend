import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export const CombinerProductsCard = ({
	combinerProductData: { id: combinerProductId, imageUrl, category, price },
	addProductToScene,
	handleRemoveProduct,
}) => {
	return (
		<div className={`${styles.combiner__cardsItem}`}>
			<div
				onClick={() => addProductToScene(category, imageUrl)}
				className={`${styles.combiner__cardsItemImage}`}
				style={{ backgroundImage: `url(${imageUrl})` }}
			>
				<p className="w-full h-full justify-center items-center">add to scene</p>
			</div>
			<div className={`${styles.combiner__cardsItemPrice}`}>{price}$</div>
			<Link to={`/products/${combinerProductId}`}>info</Link>
			<button onClick={() => handleRemoveProduct(combinerProductId, imageUrl)} style={{ marginLeft: '15px' }}>
				remove
			</button>
		</div>
	)
}
