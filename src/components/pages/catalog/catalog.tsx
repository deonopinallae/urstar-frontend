import styles from './styles.module.scss'

export const Catalog = () => {
	return (
		<section className={`${styles.catalog}`}>
			<div className={`${styles.catalog__search} flex`}>
				<input id="search" type="text" />
				<label htmlFor="search"><img src="src/assets/search.svg" alt="search" /></label>
			</div>
			<div className={`${styles.catalog__list} grid grid-cols-4`}></div>
		</section>
	)
}
