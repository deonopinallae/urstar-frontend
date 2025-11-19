import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import { Loader } from '../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct, selectUserRole } from '../../selectors'
import { useEffect, useLayoutEffect, useState } from 'react'
import { loadProductAsync, saveProductAsync } from '../../actions'
import { CATEGORIES, PRODUCT_TYPES, ROLE } from '../../constants'
import { checkAccess } from '../../utils'
import { Error } from '../error/error'

export const ProductEdit = () => {
	const roleId = useSelector(selectUserRole)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)
	const { imageUrl, name, brand, price, type, category, description } =
		useSelector(selectProduct)
	const dispatch = useDispatch()
	const { id: productId } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
	const [nameValue, setNameValue] = useState(name)
	const [brandValue, setBrandValue] = useState(brand)
	const [priceValue, setPriceValue] = useState(price)
	const [descriptionValue, setDescriptionValue] = useState(description)
	const [selectedType, setSelectedType] = useState(type)
	const [selectedCategory, setSelectedCategory] = useState(category)
    const userRole  = useSelector(selectUserRole)
	const navigate = useNavigate()

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl)
		setNameValue(name)
		setBrandValue(brand)
		setSelectedType(type)
		setSelectedCategory(category)
		setPriceValue(price)
		setDescriptionValue(description)
	}, [imageUrl, name, brand, type, category, price, description])

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
            setIsLoading(false)
			return
		}
		dispatch(loadProductAsync(productId)).then(() => {
			setIsLoading(false)
		})
	}, [dispatch, productId])

	const saveProduct = () => {
		dispatch(
			saveProductAsync(productId, {
				imageUrl: imageUrlValue,
				name: nameValue,
				brand: brandValue,
				type: selectedType,
				category: selectedCategory,
				price: priceValue,
				description: descriptionValue,
			}),
		).then(() => navigate(`/products/${productId}`))
	}
	const changeProductImage = () => {
		// setImageUrlValue
	}

	const onTypeChange = ({ target }) => {
		setSelectedType(target.value)
	}

	const onCategoryChange = ({ target }) => {
		setSelectedCategory(target.value)
	}

	if(!isAdmin) return <Error />
	if(!isLoading) return <Loader />

	return  (
		<section className={`${styles.product} container flex flex-col`}>
			<div className={`${styles.product__imageInfo} flex flex-wrap`}>
				<div
					onClick={changeProductImage}
					className={`${styles.product__image} ${styles.product__imageEditing}`}
					style={{ backgroundImage: `url(${imageUrlValue})` }}
				>
					<div
						className={`${styles.product__imageEditingLayout}  items-center justify-center`}
					>
						<p>edit</p>
					</div>
				</div>
				<div className={`${styles.product__info} flex flex-col`}>
					<input
						onChange={({ target }) => setNameValue(target.value)}
						placeholder="name"
						value={nameValue}
						className={`${styles.product__editInput}`}
					/>
					<input
						onChange={({ target }) => setBrandValue(target.value)}
						placeholder="brand"
						value={brandValue}
						className={`${styles.product__editInput}`}
					/>
					<input
						onChange={({ target }) => setPriceValue(target.value)}
						placeholder="price"
						value={priceValue}
						className={`${styles.product__editInput}`}
					/>
					<select value={selectedType} onChange={onTypeChange}>
						{PRODUCT_TYPES.map((type) => (
							<option key={Math.random()} value={type}>
								{type}
							</option>
						))}
					</select>
					<select value={selectedCategory} onChange={onCategoryChange}>
						{Object.values(CATEGORIES).map((category) => (
							<option key={Math.random()} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
			</div>
			<textarea
				onChange={({ target }) => setDescriptionValue(target.value)}
				value={descriptionValue}
				className={styles.product__description}
			/>
			<button className={styles.product__editButton} onClick={saveProduct}>
				save product
			</button>
		</section>
	)
}
