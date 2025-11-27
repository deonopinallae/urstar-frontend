import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'
import { useState } from 'react'
import { Alert, ModalWindow } from '../../../components/ui'

export const CombinerProductsCard = ({
	combinerProductData: { id: combinerProductId, imageUrl, category, price },
	addProductToScene,
	modalRemoveProductFromCombiner,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [alert, setAlert] = useState('')

	const handleRemoveProduct = (productId) => {
		if (!productId) {
			setAlert('product remove error')
			setTimeout(() => setAlert(''), 3000)
			return
		}
		setIsModalOpen(true)
	}

	return (
		<div className={`${styles.combiner__cardsItem}`}>
			{alert && <Alert text={alert} />}
			{isModalOpen && (
				<ModalWindow
					action={() =>
						modalRemoveProductFromCombiner(combinerProductId, imageUrl)
					}
					text="remove product from combiner?"
					{...{ setIsModalOpen }}
				/>
			)}
			<div
				onClick={() => addProductToScene(category, imageUrl, combinerProductId)}
				className={`${styles.combiner__cardsItemImage}`}
				style={{ backgroundImage: `url(${imageUrl})` }}
			>
				<p className="w-full h-full justify-center items-center">add to scene</p>
			</div>
			<div className={`${styles.combiner__cardsItemPrice}`}>{price}$</div>
			<Link to={`/products/${combinerProductId}`}>info</Link>
			<button
				onClick={() => handleRemoveProduct(combinerProductId)}
				style={{ marginLeft: '15px' }}
			>
				remove
			</button>
		</div>
	)
}
