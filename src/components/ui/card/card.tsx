import styles from './styles.module.scss'

export const Card = ({ productData: { imageUrl, name, brand, type, price } }) => {
	const addToCart = () => {}
	const addToFavorite = () => {}
	return (
		<div className={`${styles.card} flex flex-col justify-between`}>
			<div className={`${styles.card__image}`} style={{backgroundImage: `url(${imageUrl})`}}/>
			<div className="flex justify-between">
				<p className={`${styles.card__name}`}>{name}</p>
				<p className={`${styles.card__price}`}>{price}$</p>
			</div>
			<div className={`${styles.card_info} flex justify-between grow`}>
				<p className={`${styles.card__brand}`}>{brand}</p>
				<p className={`${styles.card__type}`}>{type}</p>
			</div>
			<div className={`${styles.card__buttons} flex justify-between`}>
				<button className={styles.card__button} onClick={addToCart}>
					<img src="src/assets/icons/cart.svg" alt="cart" />
				</button>
				<button className={styles.card__button} onClick={addToFavorite}>
					<img src="src/assets/icons/like.svg" alt="cart" />
				</button>
				<button>fast combine</button>
				<button>combine</button>
			</div>
		</div>
	)
}
