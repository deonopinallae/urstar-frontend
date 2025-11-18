import styles from './styles.module.scss'
import { Card, Loader, Pagination } from '../../components/ui'
import { useEffect, useState } from 'react'
import { request } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../selectors'
import { setProducts } from '../../actions'

export const Products = ({ products }: { products: any }) => {
	return (
		<section className={`${styles.products} flex flex-col justify-between container`}>
			<div className={`${styles.products__search} flex`}>
				<input id="search" type="text" placeholder="find your color..." />
				<label htmlFor="search">
					<img src="/assets/icons/search.svg" alt="search" />
				</label>
			</div>
			<div className="grow">
				<div className={`${styles.products__list} grid items-center`}>
					{Array.isArray(products) && products.length === 0 ? (
						<div className="text-center w-screen">
							products are out of stock yet
						</div>
					) : (
						products.map(({ id, ...productData }) => (
							<Card {...{ id, productData }} key={Math.random()} />
						))
					)}
				</div>
			</div>
			<Pagination />
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
		({ category }) => category?.toLowerCase() === lowerCaseCategoryName,
	)
	return isLoading ? <Loader /> : <Products products={filteredProducts} />
}
