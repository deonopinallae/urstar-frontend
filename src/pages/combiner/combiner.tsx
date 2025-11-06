import styles from './styles.module.scss'
import { Button } from '../../components/ui/buttons/button'
import { useState } from 'react'
import { selectUser } from '../../selectors'
import { useSelector } from 'react-redux'
import { request } from '../../utils'
import { CombinerProductsCard } from './components/combiner-products-card'
import { Loader } from '../../components/ui'

export const Combiner = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [scene, setScene] = useState({ top: '', accessory: '', bottom: '', shoes: '' })
	const user = useSelector(selectUser)
	const [combinerProducts, setCombinerProducts] = useState([])

	request(`/api/users/${user.id}/combiner`).then(({ data }) => {
		setCombinerProducts(data)
		setIsLoading(false)
	})

	// 	setScene((prevScene) => ({
	// 		...prevScene,
	// 		[productCategory]: productImage,
	// 	}))
	// 	console.log(scene)
	// }

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<section className={`${styles.combiner} container`}>
					<div className={`${styles.combiner__main} flex justify-between`}>
						<div className={`${styles.combiner__container} flex flex-col`}>
							<div
								className={`${styles.combiner__name} flex justify-between`}
							>
								<input
									type="text"
									placeholder="enter the name of your outfit"
								/>
								<Button>save</Button>
							</div>
							<div className={`${styles.combiner__scene}`}>
								<div
									className={styles.combiner__item}
									style={{ backgroundImage: `url(${scene.top})` }}
								/>
								<div
									className={styles.combiner__item}
									style={{ backgroundImage: `url(${scene.accessory})` }}
								/>
								<div
									className={styles.combiner__item}
									style={{ backgroundImage: `url(${scene.bottom})` }}
								/>
								<div
									className={styles.combiner__item}
									style={{ backgroundImage: `url(${scene.shoes})` }}
								/>
							</div>
							<div className={`${styles.combiner__buttons} flex`}>
								<Button>save outfit</Button>
								<Button>share</Button>
							</div>
						</div>
						<div
							className={`${styles.combiner__cardsList} flex flex-wrap justify-end items-start`}
						>
							{combinerProducts.map((combinerProductData) => (
								<CombinerProductsCard
									key={Math.random()}
									productData={combinerProductData}
								/>
							))}
						</div>
					</div>
					<div className={`${styles.combiner__outfits}`}>
						<h3>saved outfits</h3>
						<div
							className={`${styles.combiner__cardsList} flex flex-wrap`}
						></div>
					</div>
				</section>
			)}
		</>
	)
}
