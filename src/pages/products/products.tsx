import styles from './styles.module.scss'
import { Card, Loader } from '../../components/ui'
import { useEffect, useState } from 'react'
import { request } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../selectors'
import { setProducts } from '../../actions'

export const Products = ({ products }: { products: any }) => {
	const [searchTerm, setSearchTerm] = useState('')

	const filteredProducts = products.filter((product) =>
		product.name?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<section className={`${styles.products} flex flex-col justify-between container`}>
			<div className={`${styles.products__search} flex`}>
				<input
					id="search"
					type="text"
					placeholder="search..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<label htmlFor="search">
					<img src="/assets/icons/search.svg" alt="search" />
				</label>
			</div>
			<div className="grow">
				<div className={`${styles.products__list} grid items-center`}>
					{Array.isArray(filteredProducts) && filteredProducts.length === 0 ? (
						<div className="w-screen">products are out of stock yet</div>
					) : (
						filteredProducts.map(({ id, ...productData }) => (
							<Card {...{ id, productData }} key={id} />
						))
					)}
				</div>
			</div>
		</section>
	)
}

export const ProductsFilter = ({ categoryName }) => {
	const products = useSelector(selectProducts)
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (products.length === 0) {
			request('/api/products').then(({ data: { products } }) => {
				dispatch(setProducts(products))
				setIsLoading(false)
			})
		} else {
			setIsLoading(false)
		}
	}, [products.length])

	const lowerCaseCategoryName = categoryName?.toLowerCase()
	const filteredProducts = products.filter(
		({ category }) => category?.toLowerCase() === lowerCaseCategoryName
	)

	return isLoading ? <Loader /> : <Products products={filteredProducts} />
}
