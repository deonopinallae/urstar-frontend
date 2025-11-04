import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { AddToCombinerButton, Cart, Like } from '../'

export const Card = ({productData, productData: { imageUrl, name, brand, type, price }, id}) => {
	return (
		<Link to={`/products/${id}`} className={`${styles.card} flex flex-col justify-between`}>
			<div className={`${styles.card__image}`} style={{backgroundImage: `url(${imageUrl})`}}/>
			<div className="flex justify-between">
				<p className={`${styles.card__name}`}>{name}</p>
				<p className={`${styles.card__price}`}>{price}$</p>
			</div>
			<div className={`${styles.card_info} flex justify-between grow`}>
				<p className={`${styles.card__brand}`}>{brand}</p>
				<p className={`${styles.card__type}`}>{type}</p>
			</div>
			<div className={`${styles.card__buttons} flex justify-between flex-wrap`}>
				<Cart productId={id}/>
				<Like productId={id}/>
				<button>fast combine</button>
				<AddToCombinerButton productData={productData}/>
			</div>
		</Link>
	)
}
