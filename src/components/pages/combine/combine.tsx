import { fetchCombineProductsId } from '../../../bff/operations'
import styles from './styles.module.scss'
import { Button } from '../../ui/buttons/button'

export const Combine = () => {
	fetchCombineProductsId()

	return (
		<section className={`${styles.combine} container`}>
			<div className={`${styles.combine__main} flex justify-between`}>
				<div className={`${styles.combine__combiner} flex flex-col`}>
					<div
						className={`${styles.combine__combinerName} flex justify-between`}
					>
						<input type="text" placeholder="enter the name of your outfit" />
						<Button>save</Button>
					</div>
					<div className={`${styles.combine__combinerScene}`}>{}</div>
					<div className={`${styles.combine__combinerButtons} flex`}>
						<Button>save outfit</Button>
						<Button>share</Button>
					</div>
				</div>
				<div className={`${styles.combine__productsList} flex flex-wrap`}>
					<div className={`${styles.combine__productsItem}`}>
						<div
							className={`${styles.combine__productsItemImage}`}
							style={{ backgroundImage: `url()` }}
						></div>
						<div className={`${styles.combine__productsItemPrice}`}>{}</div>
					</div>
				</div>
			</div>
			<div className={`${styles.combine__outfits}`}>
				<h3>saved outfits</h3>
				<div className={`${styles.combine__outfitsList} flex flex-wrap`}>
					<div className={styles.combine__outfitsItem}>
						<div
							className={styles.combine__outfitsItemImage}
							style={{ backgroundImage: `url()` }}
						></div>
						<div className={styles.combine__outfitsItemName}></div>
					</div>
				</div>
			</div>
		</section>
	)
}
