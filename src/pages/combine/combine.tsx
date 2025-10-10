import styles from './styles.module.scss'
import { Button } from '../../components/ui/buttons/button'
import { useEffect, useState } from 'react'

const combineProducts = [
	{
		id: '001',
		imageURL: '/assets/products/tshirt.jpg',
		name: 'star t-shirt',
		price: '1234',
		brand: 'urstar',
		category: 'top',
	},
	{
		id: '002',
		imageURL: '/assets/products/jorts.jpeg',
		name: 'spider jorts',
		price: '1224',
		brand: 'urstar',
		category: 'bottom',
	},
	{
		id: '003',
		imageURL: '/assets/products/jorts.jpeg',
		name: 'spider jorts',
		price: '1224',
		brand: 'urstar',
		category: 'bottom',
	},
	{
		id: '004',
		imageURL: '/assets/products/jorts.jpeg',
		name: 'spider jorts',
		price: '1224',
		brand: 'urstar',
		category: 'bottom',
	},
	{
		id: '005',
		imageURL: '/assets/products/jorts.jpeg',
		name: 'spider jorts',
		price: '1224',
		brand: 'urstar',
		category: 'bottom',
	},
	{
		id: '006',
		imageURL: '/assets/products/jorts.jpeg',
		name: 'spider jorts',
		price: '1224',
		brand: 'urstar',
		category: 'bottom',
	},
]

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

export const Combine = () => {
	const [scene, setScene] = useState({ top: '', accessory: '', bottom: '', shoes: '' })

	const addProductToScene = (productCategory, productImage) => {
		setScene((prevScene) => ({
			...prevScene,
			[productCategory]: productImage,
		}))
		console.log(scene)
	}

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
					<div className={`${styles.combine__combinerScene}`}>
						<div
							className={styles.combine__combinerItem}
							style={{ backgroundImage: `url(${scene.top})` }}
						/>
						<div
							className={styles.combine__combinerItem}
							style={{ backgroundImage: `url(${scene.accessory})` }}
						/>
						<div
							className={styles.combine__combinerItem}
							style={{ backgroundImage: `url(${scene.bottom})` }}
						/>
						<div
							className={styles.combine__combinerItem}
							style={{ backgroundImage: `url(${scene.shoes})` }}
						/>
					</div>
					<div className={`${styles.combine__combinerButtons} flex`}>
						<Button>save outfit</Button>
						<Button>share</Button>
					</div>
				</div>
				<div
					className={`${styles.combine__cardsList} flex flex-wrap justify-end items-start`}
				>
					{combineProducts.map(({ id, imageURL, price, category }) => (
						<div
							onClick={() => addProductToScene(category, imageURL)}
							key={id}
							className={`${styles.combine__cardsItem}`}
						>
							<div
								className={`${styles.combine__cardsItemImage}`}
								style={{ backgroundImage: `url(${imageURL})` }}
							></div>
							<div className={`${styles.combine__cardsItemPrice}`}>
								{price}$
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={`${styles.combine__outfits}`}>
				<h3>saved outfits</h3>
				<div className={`${styles.combine__cardsList} flex flex-wrap`}>
					{savedOutfits.map(({ id, scene, name }) => (
						<div key={id} className={styles.combine__cardsItem}>
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
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
