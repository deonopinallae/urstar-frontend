import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { AddToCombinerButton, AddToCart, Like } from '../'
import { checkAccess } from '../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { CATEGORIES, ROLE } from '../../../constants'
import { selectUserRole } from '../../../selectors'
import { useEffect, useState } from 'react'
import { deleteProductAsync } from '../../../actions'

export const Card = ({
	productData: { imageUrl, name, brand, type, price, category },
	id,
}) => {
	const [selectedSize, setSelectedSize] = useState('')
	const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl']
	const [productData, setProductData] = useState({
		product: { id },
		size: selectedSize,
	})
	const roleId = useSelector(selectUserRole)
	const isGuest = checkAccess([ROLE.GUEST], roleId)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		setProductData({ product: { id }, size: selectedSize })
	}, [selectedSize])

	const chooseSize = (size) => {
		setSelectedSize(size)
		if (isGuest) navigate('/login')
	}

	return (
		<div className={`${styles.card} flex flex-col justify-between`}>
			<Link to={`/products/${id}`} className="flex flex-col justify-between">
				<div
					className={styles.card__image}
					style={{ backgroundImage: `url(${imageUrl})` }}
				/>
				<div className="flex justify-between">
					<p className={styles.card__name}>{name}</p>
					<p className={styles.card__price}>{price}$</p>
				</div>
				<div className={`${styles.card_info} flex justify-between grow`}>
					<p className={styles.card__brand}>{brand}</p>
					<p className={styles.card__type}>{type}</p>
				</div>
			</Link>

			{[category].includes(CATEGORIES.TOP) ||
			[category].includes(CATEGORIES.BOTTOM) ? (
				<div className={`${styles.card__sizes} flex`}>
					{sizes.map((size) => (
						<button
							key={size}
							onClick={() => chooseSize(size)}
							className={`${styles.card__sizeBtn} ${size === selectedSize ? styles.active : ''}`}
						>
							{size}
						</button>
					))}
				</div>
			) : null}

			<div className={`${styles.card__buttons} flex flex-wrap`}>
				<Like productId={id} />
				<AddToCart productData={productData} selectedSize={selectedSize} />
				
				{isAdmin && <button onClick={() => dispatch(deleteProductAsync(id))}>delete</button>}
			</div>
			<AddToCombinerButton productId={id} />
		</div>
	)
}
