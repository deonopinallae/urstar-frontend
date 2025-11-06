import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export const CombinerProductsCard = ({
	productData: { _id: id, imageUrl, category, price },
}) => {
	const addProductToScene = (productCategory, productImage) => {}

	return (
		<div key={id} className={`${styles.combiner__cardsItem}`}>
			<div
				onClick={() => addProductToScene(category, imageUrl)}
				className={`${styles.combiner__cardsItemImage}`}
				style={{ backgroundImage: `url(${imageUrl})` }}
			>
				<p className="w-full h-full justify-center items-center">add to scene</p>
			</div>
			<div className={`${styles.combiner__cardsItemPrice}`}>{price}$</div>
			<Link to={`/products/${id}`}>info</Link>
		</div>
	)
}

{
	/* <Link to={`/products/${id}`} className={`${styles.card} flex flex-col justify-between`}>
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
				<AddToCombinerButton productId={id} />
			</div>
		</Link> */
}
