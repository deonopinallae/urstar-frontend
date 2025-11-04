import { useSelector } from 'react-redux'
import styles from '../styles.module.scss'
import { selectCombinerProducts } from '../../../selectors'

export const CombinerProductsCard = ({combinerProductData: {id, imageUrl, category, price}}) => {

	const addProductToScene = (productCategory, productImage) => {

	return (
		<div
			onClick={() => addProductToScene(category, imageUrl)}
			key={id}
			className={`${styles.combiner__cardsItem}`}
		>
			<div
				className={`${styles.combiner__cardsItemImage}`}
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div className={`${styles.combiner__cardsItemPrice}`}>{price}$</div>
		</div>
	)
}
