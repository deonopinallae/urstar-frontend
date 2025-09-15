import styles from './styles.module.scss'
import { Card, Pagination } from '../../ui'
import { useGetProducts } from '../../../hook'

export const Category = ({ products, error }) => {
	return (
		<section className={`${styles.category} flex flex-col justify-between container`}>
			<div className={`${styles.category__search} flex`}>
				<input id="search" type="text" placeholder="find your color..." />
				<label htmlFor="search">
					<img src="src/assets/icons/search.svg" alt="search" />
				</label>
			</div>
			<div className="grow">
				<div className={`${styles.category__list} grid items-center`}>
					{products.length === 0 ? (
						'products are out of stock yet'
					) : error === '' ? (
						products.map(({ id, ...productData }) => (
							<Card {...{ productData }} key={id} />
						))
					) : (
						<p>{error}</p>
					)}
				</div>
			</div>
			<Pagination />
		</section>
	)
}

export const CategoryFilter = ({ categoryName }) => {
	const { products, error } = useGetProducts()
	const filteredProducts = products.filter(({ category }) => category === categoryName)
	return <Category products={filteredProducts} error={error} />
}
