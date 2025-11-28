import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { useLayoutEffect, useRef, useState } from 'react'
import { addProductAsync } from '../../actions'
import { CATEGORIES, PRODUCT_TYPES, ROLE } from '../../constants'
import { checkAccess } from '../../utils'
import { Error } from '../error/error'
import { Alert } from '../../components/ui'

export const ProductAdd = () => {
	const roleId = useSelector(selectUserRole)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)
	const dispatch = useDispatch()
	const [nameValue, setNameValue] = useState()
	const [brandValue, setBrandValue] = useState()
	const [priceValue, setPriceValue] = useState()
	const [descriptionValue, setDescriptionValue] = useState()
	const [selectedType, setSelectedType] = useState('t-shirt')
	const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.TOP)
	const userRole = useSelector(selectUserRole)
	const navigate = useNavigate()
	const fileInputRef = useRef(null)
	const [imageFile, setImageFile] = useState(null)
	const [imageUrlValue, setImageUrlValue] = useState(null)
	const [alert, setAlert] = useState('')

	const changeProductImage = () => {
		setAlert('')
		fileInputRef.current.click()
	}

	const onFileSelect = (e) => {
		const file = e.target.files[0]
		if (!file) return
		setImageFile(file)
		setImageUrlValue(URL.createObjectURL(file))
	}

	useLayoutEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}
	}, [])

	const addProduct = () => {
		if (
			!imageFile ||
			!nameValue ||
			!brandValue ||
			!priceValue ||
			!descriptionValue ||
			!selectedType ||
			!selectedCategory
		)
			return setAlert('enter all the inputs')
		const form = new FormData()
		form.append('image', imageFile)
		form.append('name', nameValue)
		form.append('brand', brandValue)
		form.append('price', priceValue)
		form.append('type', selectedType)
		form.append('category', selectedCategory)
		form.append('description', descriptionValue)

		dispatch(addProductAsync(form)).then((data) => navigate(`/products/${data.id}`))
	}

	const onTypeChange = ({ target }) => {
		setAlert('')
		setSelectedType(target.value)
	}

	const onCategoryChange = ({ target }) => {
		setAlert('')
		setSelectedCategory(target.value)
	}

	if (!isAdmin) return <Error />

	return (
		<section className={`${styles.product} container flex flex-col`}>
			{alert && <Alert text={alert} />}
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
						onChange={({ target }) => {
							setAlert('')
							setNameValue(target.value)
						}}
						placeholder="name"
						value={nameValue}
						className={`${styles.product__editInput}`}
					/>
					<input
						onChange={({ target }) => {
							setAlert('')
							setBrandValue(target.value)
						}}
						placeholder="brand"
						value={brandValue}
						className={`${styles.product__editInput}`}
					/>
					<input
						onChange={({ target }) => {
							setAlert('')
							setPriceValue(target.value)
						}}
						placeholder="price"
						type='number'
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
			<button className={styles.product__addButton} onClick={addProduct}>
				add product
			</button>
		</section>
	)
}
