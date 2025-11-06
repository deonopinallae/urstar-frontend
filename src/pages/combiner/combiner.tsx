import styles from './styles.module.scss'
import { Button } from '../../components/ui/buttons/button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/card/card'
import { selectCombinerProducts, selectUser } from '../../selectors'
import { useSelector } from 'react-redux'

export const Combiner = () => {
	const [scene, setScene] = useState({ top: '', accessory: '', bottom: '', shoes: '' })
	const combinerProducts = useSelector(selectCombinerProducts)
	const user = useSelector(selectUser)

	// 	setScene((prevScene) => ({
	// 		...prevScene,
	// 		[productCategory]: productImage,
	// 	}))
	// 	console.log(scene)
	// }

	return (
		<section className={`${styles.combiner} container`}>
			<div className={`${styles.combiner__main} flex justify-between`}>
				<div className={`${styles.combiner__container} flex flex-col`}>
					<div className={`${styles.combiner__name} flex justify-between`}>
						<input type="text" placeholder="enter the name of your outfit" />
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
						console.log(combinerProductData)
					))}
					
				</div>
			</div>
			<div className={`${styles.combiner__outfits}`}>
				<h3>saved outfits</h3>
				<div className={`${styles.combiner__cardsList} flex flex-wrap`}></div>
			</div>
		</section>
	)
}
