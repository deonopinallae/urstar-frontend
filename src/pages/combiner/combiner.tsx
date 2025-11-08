import styles from './styles.module.scss'
import { Button } from '../../components/ui/buttons/button'
import { useEffect, useState } from 'react'
import { selectUserId } from '../../selectors'
import { useSelector } from 'react-redux'
import { request } from '../../utils'
import { CombinerProductsCard } from './components/combiner-products-card'
import { Loader } from '../../components/ui'

export const Combiner = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [scene, setScene] = useState(() => {
		const savedScene = sessionStorage.getItem('combinerScene')
		return savedScene
			? JSON.parse(savedScene)
			: { top: '', accessory: '', bottom: '', shoes: '' }
	})

	const userId = useSelector(selectUserId)
	const [combinerProducts, setCombinerProducts] = useState([])

	useEffect(() => {
		if (!userId) return
		request(`/api/users/${userId}/combiner`)
			.then(({ data }) => setCombinerProducts(data))
			.finally(() => setIsLoading(false))
	}, [userId, combinerProducts])

	useEffect(() => {
		sessionStorage.setItem('combinerScene', JSON.stringify(scene))
	}, [scene])

	const addProductToScene = (category, imageUrl) => {
		setScene((prev) => ({
			...prev,
			[category]: imageUrl,
		}))
	}

	const handleRemoveProduct = async (productId) => {
		const { data } = await request(
			`/api/users/${userId}/combiner/${productId}`,
			'DELETE',
		)
		setCombinerProducts(data)
	}

	const clearScene = () => {
		sessionStorage.removeItem('combinerScene')
		setScene({ top: '', accessory: '', bottom: '', shoes: '' })
	}

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
							<div className={`${styles.combiner__scene} `}>
								<div
									className={`${styles.combiner__sceneItem} ${styles.combiner__sceneItemTop} `}
									style={{
										backgroundImage: `url(${scene.top})`,
										display: `${scene.top !== '' ? 'block' : 'none'}`,
									}}
								/>
								<div
									className={`${styles.combiner__sceneItem} ${styles.combiner__sceneItemAccessory} `}
									style={{
										backgroundImage: `url(${scene.accessory})`,
										display: `${scene.top !== '' ? 'block' : 'none'}`,
									}}
								/>
								<div
									className={`${styles.combiner__sceneItem} ${styles.combiner__sceneItemBottom} `}
									style={{
										backgroundImage: `url(${scene.bottom})`,
										display: `${scene.top !== '' ? 'block' : 'none'}`,
									}}
								/>
								<div
									className={`${styles.combiner__sceneItem} ${styles.combiner__sceneItemShoes} `}
									style={{
										backgroundImage: `url(${scene.shoes})`,
										display: `${scene.top !== '' ? 'block' : 'none'}`,
									}}
								/>
							</div>
							<div className={`${styles.combiner__buttons} flex`}>
								<button>save outfit</button>
								<button>share</button>
								<button onClick={clearScene}>clear</button>
							</div>
						</div>
						<div
							className={`${styles.combiner__cardsList} flex flex-wrap justify-end items-start`}
						>
							{combinerProducts.map((combinerProductData) => (
								<CombinerProductsCard
									key={Math.random()}
									{...{
										combinerProductData,
										addProductToScene,
										userId,
										handleRemoveProduct
									}}
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
