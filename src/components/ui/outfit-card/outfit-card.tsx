import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { AddToCombinerButton, Cart, Like } from '..'

const savedOutfits = [
	{
		id: '001',
		name: 'star girl',
		scene: [
			{ id: '001', imageURL: '/assets/products/tshirt.jpg' },
			{ id: '002', imageURL: '/assets/products/jorts.jpeg' },
		],
	},
	{
		id: '002',
		name: 'star boy',
		scene: [
			{ id: '001', imageURL: '/assets/products/tshirt.jpg' },
			{ id: '002', imageUrl: '/assets/products/jorts.jpeg' },
		],
	},
]

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
