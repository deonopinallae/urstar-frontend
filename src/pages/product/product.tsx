import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import { useGetProducts } from '../../hook'
import { Cart, Combine, Like, Loader } from '../../components/ui'
import { Review } from '..'

export const Product = () => {
	const { id: productId } = useParams()
	const { products, error } = useGetProducts()
	const productData = products.find(({ id }) => id === productId)

	if (!productData) return <Loader />

	const { id, imageUrl, name, brand, price, description, reviews } = productData

	const productRating = () => {
		if (reviews.length === 0) return 'no rating yet'
		const sumOfReviewsRating = reviews.reduce(
			(acc, curr) => acc + Number(curr.rating),
			0,
		)
		return sumOfReviewsRating / reviews.length
	}
	console.log(productRating())

	return (
		<section className={`${styles.product} container flex flex-col`}>
			<div className={`${styles.product__imageInfo} flex flex-wrap`}>
				<div
					className={`${styles.product__image}`}
					style={{ backgroundImage: `url(${imageUrl})` }}
				/>
				<div className={`${styles.product__info} flex flex-col`}>
					<h1 className={`${styles.product__name}`}>{name}</h1>
					<h2 className={`${styles.product__brand}`}>{brand}</h2>
					<div className={`${styles.product__price}`}>{price}$</div>
					<div className={`${styles.product__size} flex`}>
						<button className={styles.product__sizeBtn}>xxs</button>
						<button className={styles.product__sizeBtn}>s</button>
						<button className={styles.product__sizeBtn}>m</button>
						<button className={styles.product__sizeBtn}>l</button>
						<button className={styles.product__sizeBtn}>xl</button>
					</div>
					<div className={`${styles.product__buttons} flex`}>
						<Cart productId={id} />
						<Like productId={id} />
						<Combine productId={id} />
					</div>
				</div>
			</div>
			<div className={`${styles.product__description}`}>
				<div>Description</div>
				{description}
			</div>
			<div className={`${styles.product__rating}`}>Rating: {productRating()}</div>
			<div className={`${styles.product__reviews} flex flex-col`}>
				<div>Reviews</div>
				{reviews.length === 0
					? 'no reviews yet'
					: reviews.map((review) => <Review key={review.id} review={review} />)}
			</div>
		</section>
	)
}
