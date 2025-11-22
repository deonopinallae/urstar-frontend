import { useState } from 'react'
import styles from './styles.module.scss'
import { removeFromCartAsync } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../selectors'

export const CartCard = ({ product: { id: productId, imageUrl, name, price, size } }) => {
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)

	const removeProductFromCart = () => {
		dispatch(removeFromCartAsync(userId, productId, size))
	}

	return (
		<div className={styles.card}>
			<img className={styles.card__img} src={imageUrl} alt={name} />
			<div className={styles.card__info}>
				<p className={styles.card__name}>{name}</p>
				<p className={styles.card__size}>size: {size}</p>
				<p className={styles.card__price}>${price}</p>
			</div>
			<button className={styles.card__removeBtn} onClick={removeProductFromCart}>
				×
			</button>
		</div>
	)
}
