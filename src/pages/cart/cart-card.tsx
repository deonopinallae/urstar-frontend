import styles from './styles.module.scss'
import { removeFromCartAsync } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../selectors'
import { ModalWindow } from '../../components/ui'
import { useState } from 'react'

export const CartCard = ({ product: { id: productId, imageUrl, name, price, size } }) => {
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const removeProductFromCart = () => {
		setIsModalOpen(true)
	}

	const modalRemoveProductFromCart = () => {
		dispatch(removeFromCartAsync(userId, productId, size))
	}

	return (
		<>
			{isModalOpen && (
				<ModalWindow
					action={modalRemoveProductFromCart}
					text="remove product from cart?"
					{...{ setIsModalOpen }}
				/>
			)}
			<div className={styles.card}>
				<img className={styles.card__img} src={imageUrl} alt={name} />
				<div className={styles.card__info}>
					<p className={styles.card__name}>{name}</p>
					<p className={styles.card__size}>size: {size}</p>
					<p className={styles.card__price}>${price}</p>
				</div>
				<button
					className={styles.card__removeBtn}
					onClick={removeProductFromCart}
				>
					x
				</button>
			</div>
		</>
	)
}
