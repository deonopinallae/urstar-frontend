import styles from './styles.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
	AddToCombinerButton,
	AddToCart,
	Like,
	Loader,
	ModalWindow,
} from '../../components/ui'
import { Review } from '..'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, selectUserRole } from '../../selectors'
import { useEffect, useState } from 'react'
import { useGetProductRating } from '../../hooks'
import {
	loadProductAsync,
	deleteProductAsync,
	deleteReview,
	setProducts,
} from '../../actions'
import { checkAccess, request } from '../../utils'
import { CATEGORIES, ROLE } from '../../constants'
import { ReviewForm } from './review/review-form'

export const Product = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const navigate = useNavigate()

	const products = useSelector(selectProducts)
	const roleId = useSelector(selectUserRole)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)
	const isGuest = checkAccess([ROLE.GUEST], roleId)

	const [isLoading, setIsLoading] = useState(true)
	const [selectedSize, setSelectedSize] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl']

	// загрузка продуктов, если ещё нет
	useEffect(() => {
		if (products.length === 0) {
			request('/api/products')
				.then(({ data: { products } }) => {
					dispatch(setProducts(products))
				})
				.finally(() => setIsLoading(false))
		} else {
			setIsLoading(false)
		}
	}, [products, dispatch])

	const product = products.find((p) => p.id === id)

	useEffect(() => {
		if (!product) {
			dispatch(loadProductAsync(id))
		}
	}, [dispatch, id, product])

	if (isLoading || !product) return <Loader />

	const { imageUrl, name, brand, price, category, description, reviews } =
		product

	const chooseSize = (size) => {
		setSelectedSize(size)
		if (isGuest) navigate('/login')
	}

	const removeReview = (reviewId) => {
		if (!isAdmin) return
		request(`/api/products/${id}/reviews/${reviewId}`, 'DELETE').then(() =>
			dispatch(deleteReview(reviewId))
		)
	}

	const productData = { product: { id }, selectedSize }

	const deleteProduct = () => {
		dispatch(deleteProductAsync(id))
		navigate('/catalog')
	}

	return (
		<section className={`${styles.product} container flex flex-col`}>
			{isModalOpen && (
				<ModalWindow
					action={deleteProduct}
					text="delete product?"
					{...{ setIsModalOpen }}
				/>
			)}
			<div className={`${styles.product__imageInfo} flex flex-wrap`}>
				<div
					className={`${styles.product__image}`}
					style={{ backgroundImage: `url(${imageUrl})` }}
				/>
				<div className={`${styles.product__info} flex flex-col`}>
					<h1 className={`${styles.product__name}`}>{name}</h1>
					<h2 className={`${styles.product__brand}`}>{brand}</h2>
					<div className={`${styles.product__price}`}>{price}$</div>

					{[category].includes(CATEGORIES.TOP) ||
					[category].includes(CATEGORIES.BOTTOM) ||
					[category].includes(CATEGORIES.SHOES) ? (
						<div className={`${styles.product__sizes} flex`}>
							{sizes.map((s) => (
								<button
									key={s}
									onClick={() => chooseSize(s)}
									className={`${styles.product__sizesBtn} ${
										selectedSize === s ? styles.active : ''
									}`}
								>
									{s}
								</button>
							))}
						</div>
					) : (
						<div>no size</div>
					)}

					<div className={`${styles.product__buttons} flex`}>
						<AddToCart
							productData={productData}
							selectedSize={selectedSize}
						/>
						<Like productId={id} />
						<AddToCombinerButton productId={id} />
					</div>

					{isAdmin && (
						<Link
							className={`${styles.product__button}`}
							to={`/products/${id}/edit`}
						>
							edit product
						</Link>
					)}
					{isAdmin && (
						<button
							className={`${styles.product__button}`}
							onClick={() => setIsModalOpen(true)}
						>
							delete product
						</button>
					)}
				</div>
			</div>

			<div className={`${styles.product__description}`}>
				<div>description</div>
				{description}
			</div>

			<div className={`${styles.product__rating}`}>
				rating: {useGetProductRating(reviews)}
			</div>

			<div className={`${styles.product__reviews} flex flex-col`}>
				<div>reviews</div>
				{!isGuest && <ReviewForm {...{ id }} />}

				{reviews.length === 0
					? 'no reviews yet'
					: reviews.map((review) => (
							<Review key={review.id} {...{ review, removeReview }} />
					  ))}
			</div>
		</section>
	)
}
