import { useEffect, useState } from 'react'
import { Card, Pagination } from '../../ui'
import { fetchProducts } from '../../../bff/operations/fetch-products'
import styles from './styles.module.scss'

export const Catalog = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		fetchProducts().then(({ res: loadedProducts }) => setProducts(loadedProducts))
	}, [])

	return (
		<section className={`${styles.catalog} flex flex-col justify-between container`}>
			<div className={`${styles.catalog__search} flex`}>
				<input id="search" type="text" placeholder="find your color..." />
				<label htmlFor="search">
					<img src="src/assets/search.svg" alt="search" />
				</label>
			</div>
			<div className="grow">
				<div className={`${styles.catalog__list} grid items-center`}>
					{products.map(({ id, ...productData }) => (
						<Card {...{ productData }} key={id} />
					))}
				</div>
			</div>
			<Pagination />
		</section>
	)
}
