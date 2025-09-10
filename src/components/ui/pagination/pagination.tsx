import styles from './styles.module.scss'

export const Pagination = () => {
	return (
		<div className={`${styles.pagination} flex justify-center item-center`}>
			<button>previous</button>
			{/* <button>{currentPage}</button> */}
			<button>next</button>
		</div>
	)
}
