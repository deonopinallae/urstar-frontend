import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import { Loader } from '../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct, selectProducts, selectUserRole } from '../../selectors'
import { useEffect, useState, useRef } from 'react'
import { loadProductAsync, saveProductAsync } from '../../actions'
import { CATEGORIES, PRODUCT_TYPES, ROLE } from '../../constants'
import { checkAccess } from '../../utils'
import { Error } from '../error/error'

export const ProductEdit = () => {
	const products = useSelector(selectProducts) 
	const roleId = useSelector(selectUserRole)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)
	const product = useSelector(selectProduct)
	const dispatch = useDispatch()
	const { id: productId } = useParams()
	const [isLoading, setIsLoading] = useState(true)

	const [imageFile, setImageFile] = useState(null)
	const [imageUrlValue, setImageUrlValue] = useState(product.imageUrl)
	const [nameValue, setNameValue] = useState(product.name)
	const [brandValue, setBrandValue] = useState(product.brand)
	const [priceValue, setPriceValue] = useState(product.price)
	const [descriptionValue, setDescriptionValue] = useState(product.description)
	const [selectedType, setSelectedType] = useState(product.type)
	const [selectedCategory, setSelectedCategory] = useState(product.category)

	const navigate = useNavigate()
	const fileInputRef = useRef(null)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], roleId)) return setIsLoading(false)

		dispatch(loadProductAsync(productId))
			.then((productData) => {
				setImageUrlValue(productData.imageUrl)
				setNameValue(productData.name)
				setBrandValue(productData.brand)
				setPriceValue(productData.price)
				setDescriptionValue(productData.description)
				setSelectedType(productData.type)
				setSelectedCategory(productData.category)
				setIsLoading(false)
			})
			.catch(() => setIsLoading(false))
	}, [dispatch, productId, roleId])

	const changeProductImage = () => fileInputRef.current.click()

	const onFileSelect = (e) => {
		const file = e.target.files[0]
		if (!file) return
		setImageFile(file)
		setImageUrlValue(URL.createObjectURL(file)) // превью
	}

	const saveProduct = () => {
		const form = new FormData()
		if (imageFile) form.append('image', imageFile)
		form.append('name', nameValue)
		form.append('brand', brandValue)
		form.append('price', priceValue)
		form.append('type', selectedType)
		form.append('category', selectedCategory)
		form.append('description', descriptionValue)
		form.append('imageUrl', imageUrlValue)

		dispatch(saveProductAsync(productId, form, products)).then(() =>
			navigate(`/products/${productId}`),
		)
	}

	if (!isAdmin) return <Error />
	if (isLoading) return <Loader />

	return (
		<section className={`${styles.product} container flex flex-col`}>
			<div className={`${styles.product__imageInfo} flex flex-wrap`}>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					style={{ display: 'none' }}
					onChange={onFileSelect}
				/>
				<div
					onClick={changeProductImage}
					className={`${styles.product__image} ${styles.product__imageEditing}`}
					style={{
						backgroundImage: imageUrlValue ? `url(${imageUrlValue})` : 'none',
					}}
				>
					<div className={styles.product__imageEditingLayout}>
						<p>edit</p>
					</div>
				</div>

				<div className={`${styles.product__info} flex flex-col`}>
					<input
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
						placeholder="name"
						className={styles.product__editInput}
					/>
					<input
						value={brandValue}
						onChange={(e) => setBrandValue(e.target.value)}
						placeholder="brand"
						className={styles.product__editInput}
					/>
					<input
						value={priceValue}
						onChange={(e) => {
							setPriceValue(e.target.value)}
						}
						placeholder="price"
						type='number'
						className={styles.product__editInput}
					/>
					<select
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
					>
						{PRODUCT_TYPES.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						{Object.values(CATEGORIES).map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>
			</div>

			<textarea
				value={descriptionValue}
				onChange={(e) => setDescriptionValue(e.target.value)}
				className={styles.product__description}
			/>
			<button className={styles.product__editButton} onClick={saveProduct}>
				save product
			</button>
		</section>
	)
}
