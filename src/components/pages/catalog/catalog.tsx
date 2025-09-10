import { useEffect, useState } from 'react'
import { Card, Pagination } from '../../ui'
import { fetchProducts } from '../../../bff/operations/fetch-products'
import styles from './styles.module.scss'
import { getProducts } from '../../../bff/api'

export const Catalog = () => {
	const [products, setProducts] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		getProducts().then(({ res: loadedProducts, error: errorMessage }) => {
			if (errorMessage) {
				setError(errorMessage)
			} else {
				setProducts(loadedProducts)
			}
		})
	}, [])

	return (
		<section className={`${styles.catalog} flex flex-col justify-between container`}>
			<div className={`${styles.catalog__search} flex`}>
				<input id="search" type="text" placeholder="find your color..." />
				<label htmlFor="search">
					<img src="src/assets/icons/search.svg" alt="search" />
				</label>
			</div>
			<div className="grow">
				<div className={`${styles.catalog__list} grid items-center`}>
					{error === ''
						? products.map(({ id, ...productData }) => (
								<Card {...{ productData }} key={id} />
						  ))
						: <p>{error}</p>}
				</div>
			</div>
			<Pagination />
		</section>
	)
}
