import styles from './styles.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AddToCombinerButton, Cart, Like, Loader } from '../../components/ui'
import { Review } from '..'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct, selectUserRole } from '../../selectors'
import { useEffect, useState } from 'react'
import { useGetProductRating } from '../../hooks'
import { loadProductAsync } from '../../actions'
import { checkAccess, request } from '../../utils'
import { CATEGORIES, ROLE } from '../../constants'
import { ReviewForm } from './review/review-form'
import { deleteReview } from '../../actions/delete-review'

export const Product = () => {
	const productData = useSelector(selectProduct)
	const { imageUrl, name, brand, price, category, description, reviews } =
		productData
	const dispatch = useDispatch()
	const { id: productId } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const roleId = useSelector(selectUserRole)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)
	const isGuest = checkAccess([ROLE.GUEST], roleId)
	const navigate = useNavigate()
	const [size, setSize] = useState(null)
	const [chooseSizeAlert, setChooseSizeAlert] = useState(false)
	const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl']

	useEffect(() => {
		dispatch(loadProductAsync(productId)).then(() => {
			setIsLoading(false)
		})
	}, [dispatch, productId])

	const chooseSize = (size) => {
		setSize(size)
		isGuest && navigate('/login')
	}

	const removeReview = (reviewId) => {
		request(`/api/products/${productId}/reviews/${reviewId}`, 'DELETE').then(() => {
			dispatch(deleteReview(reviewId))
		})
	}

	const productDataAndSize = { ...productData, size: size }

	if (isLoading) return <Loader />

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
					<div>choosed size: {size ? size : "size isn't choosed yet"}</div>
					{[category].includes(CATEGORIES.TOP) ||
					[category].includes(CATEGORIES.BOTTOM) ? (
						<div className={`${styles.product__size} flex`}>
							{sizes.map((size) => (
								<button
									key={Math.random()}
									onClick={() => chooseSize(size)}
									className={styles.product__sizeBtn}
								>
									{size}
								</button>
							))}
						</div>
					) : (
						<div>no size</div>
					)}
					{chooseSizeAlert && (
						<div className={styles.product__chooseSizeAlert}>choose size</div>
					)}
					<div className={`${styles.product__buttons} flex`}>
						<Cart {...{ productDataAndSize }} />
						<Like productId={productId} />
						<AddToCombinerButton productId={productId} />
						{isAdmin && (
							<Link
								className={`${styles.product__editButton}`}
								to={`/products/${productId}/edit`}
							>
								edit product
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className={`${styles.product__description}`}>
				<div>Description</div>
				{description}
			</div>
			<div className={`${styles.product__rating}`}>
				Rating: {useGetProductRating(reviews)}
			</div>
			<div className={`${styles.product__reviews} flex flex-col`}>
				<div>Reviews</div>
				{!isGuest && <ReviewForm {...{ productId }} />}

				{reviews.length === 0
					? 'no reviews yet'
					: reviews.map((review) => (
							<Review key={review.id} {...{ review, removeReview }} />
						))}
			</div>
		</section>
	)
}
