import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { Loader } from '../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { useEffect, useLayoutEffect, useState } from 'react'
import { addProductAsync } from '../../actions'
import { CATEGORIES, PRODUCT_TYPES, ROLE } from '../../constants'
import { checkAccess } from '../../utils'
import { Error } from '../error/error'

export const ProductAdd = () => {
	const roleId = useSelector(selectUserRole)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)
	const dispatch = useDispatch()
	const [imageUrlValue, setImageUrlValue] = useState()
	const [nameValue, setNameValue] = useState()
	const [brandValue, setBrandValue] = useState()
	const [priceValue, setPriceValue] = useState()
	const [descriptionValue, setDescriptionValue] = useState()
	const [selectedType, setSelectedType] = useState()
	const [selectedCategory, setSelectedCategory] = useState()
	const userRole = useSelector(selectUserRole)
	const navigate = useNavigate()

	useLayoutEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}
	}, [])

	const addProduct = () => {
		dispatch(
			addProductAsync({
				imageUrl: imageUrlValue,
				name: nameValue,
				brand: brandValue,
				type: selectedType,
				category: selectedCategory,
				price: priceValue,
				description: descriptionValue,
			}),
		).then((data) => {
			navigate(`/products/${data.id}`)
		})
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

	if (!isAdmin) return <Error />

	return (
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
			<button className={styles.product__addButton} onClick={addProduct}>
				add product
			</button>
		</section>
	)
}
