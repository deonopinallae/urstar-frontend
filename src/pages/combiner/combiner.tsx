import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import {
	selectCombinerProducts,
	selectUser,
	selectUserId,
	selectUserOutfits,
} from '../../selectors'
import { useDispatch, useSelector } from 'react-redux'
import { CombinerProductsCard } from './components/combiner-products-card'
import { Alert, Loader } from '../../components/ui'
import {  saveOutfitAsync } from '../../actions'
import { CombinerOutfitCard } from './components/combiner-outfit-card'
import { removeFromCombinerAsync } from '../../actions'

export const Combiner = () => {
	const defaultScene = { top: '', accessory: '', bottom: '', shoes: '' }
	const [scene, setScene] = useState(() => {
		const savedScene = sessionStorage.getItem('combinerScene')
		return savedScene ? JSON.parse(savedScene) : defaultScene
	})
	const [outfitName, setOutfitName] = useState('')
	const [alert, setAlert] = useState('')

	const user = useSelector(selectUser)
	const userId = useSelector(selectUserId)
	const combinerProducts = useSelector(selectCombinerProducts)
	const outfits = useSelector(selectUserOutfits)

	const dispatch = useDispatch()

	const isUserLoaded = Boolean(userId) && Boolean(user.login)

	useEffect(() => {
		sessionStorage.setItem('combinerScene', JSON.stringify(scene))
	}, [userId, scene])

	if (!isUserLoaded) return <Loader />

	const addProductToScene = (category, imageUrl) => {
		setScene((prev) => ({
			...prev,
			[category]: imageUrl,
		}))
	}

	const handleRemoveProduct = (productId, imageUrl) => {
		dispatch(removeFromCombinerAsync(userId, productId))
		setScene((prev) => {
			const updated = { ...prev }
			for (const key in prev) {
				if (prev[key] === imageUrl) updated[key] = ''
			}
			return updated
		})
	}

	const clearScene = () => {
		sessionStorage.removeItem('combinerScene')
		setScene(defaultScene)
	}

	const handleSaveOutfit = async () => {
		if (outfitName === '') {
			setAlert('enter the name of outfit')
			setTimeout(() => setAlert(''), 3000)
			return
		}
		const isEmptyScene = Object.values(scene).every((v) => v === '')
		if (isEmptyScene) {
			setAlert('scene is empty')
			setTimeout(() => setAlert(''), 3000)
			return
		}
		const outfitData = { scene, name: outfitName }

		dispatch(
			saveOutfitAsync(userId, outfitData)
		)

		clearScene()
		setAlert('outfit have been saved')
		setTimeout(() => setAlert(''), 3000)
	}

	return (
		<>
			<section className={`${styles.combiner} container`}>
				{alert && <Alert text={alert} />}
				<div className={`${styles.combiner__main} flex justify-between`}>
					<div className={`${styles.combiner__container} flex flex-col`}>
						<div className={`${styles.combiner__name} flex justify-between`}>
							<input
								onChange={({ target }) => {
									setOutfitName(target.value.trim())
								}}
								value={outfitName}
								type="text"
								placeholder="enter the name of your outfit"
							/>
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
									display: `${scene.accessory !== '' ? 'block' : 'none'}`,
								}}
							/>
							<div
								className={`${styles.combiner__sceneItem} ${styles.combiner__sceneItemBottom} `}
								style={{
									backgroundImage: `url(${scene.bottom})`,
									display: `${scene.bottom !== '' ? 'block' : 'none'}`,
								}}
							/>
							<div
								className={`${styles.combiner__sceneItem} ${styles.combiner__sceneItemShoes} `}
								style={{
									backgroundImage: `url(${scene.shoes})`,
									display: `${scene.shoes !== '' ? 'block' : 'none'}`,
								}}
							/>
						</div>
						<div className={`${styles.combiner__buttons} flex`}>
							<button
								disabled={scene == defaultScene}
								onClick={handleSaveOutfit}
							>
								save outfit
							</button>
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
									handleRemoveProduct,
								}}
							/>
						))}
					</div>
				</div>
				<div className={`${styles.combiner__outfits}`}>
					<h3>saved outfits</h3>
					<div className={`${styles.combiner__cardsList} grid items-center`}>
						{outfits.length
							? outfits.map((outfit, index) => (
									<CombinerOutfitCard
										key={index}
										{...{ outfit, userId }}
									/>
								))
							: 'no outfits yet'}
					</div>
				</div>
			</section>
		</>
	)
}
