import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export const OutfitCard = ({ outfitData: { imagesUrl, name }, id }) => {
	return (
		<Link to={`/combine/${id}`} key={id} className={styles.combine__cardsItem}>
			<div
				className={`${styles.combine__outfitsCardContainer} flex flex-col items-center`}
			>
				{scene.map(({ id, imageURL }) => (
					<div
						key={id}
						className={styles.combine__outfitsCardImage}
						style={{ backgroundImage: `url(${imageURL})` }}
					></div>
				))}
			</div>
			<div className={styles.combine__cardsItemName}>{name}</div>
		</Link>
	)
}
