import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { AddToCombinerButton, Cart, Like } from '../'

export const Card = ({productData: { imageUrl, name, brand, type, price }, id}) => {
	return (
		<div className={`${styles.card} flex flex-col justify-between`}>
			<Link to={`/products/${id}`} className={`flex flex-col justify-between`}>
			<div className={`${styles.card__image}`} style={{backgroundImage: `url(${imageUrl})`}}/>
			<div className="flex justify-between">
				<p className={`${styles.card__name}`}>{name}</p>
				<p className={`${styles.card__price}`}>{price}$</p>
			</div>
			<div className={`${styles.card_info} flex justify-between grow`}>
				<p className={`${styles.card__brand}`}>{brand}</p>
				<p className={`${styles.card__type}`}>{type}</p>
			</div>			
			</Link>
			<div className={`${styles.card__buttons} flex flex-wrap`}>
				<Cart productId={id}/>
				<Like {...{id}}/>
				<AddToCombinerButton productId={id} />
			</div>
		</div>
	)
}
