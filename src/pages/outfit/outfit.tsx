import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { request } from '../../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../components/ui'
import { deleteOutfitAsync } from '../../actions'
import { useDispatch } from 'react-redux'

export const Outfit = () => {
	const { id: userId, outfitId } = useParams()
	const [outfitData, setOutfitData] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		request(`/api/users/${userId}/outfits/${outfitId}`).then(({ data }) => {
			setOutfitData(data)
			setIsLoading(false)
		})
	}, [])

	const deleteOutfit = () => {
		dispatch(deleteOutfitAsync(userId, outfitId))
		navigate(`/users/${userId}/combiner`)
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<section className={`${styles.outfit} container flex items-center flex-col`}>
					name: {outfitData.name}
					<div className={`${styles.outfit__scene} `}>
						<div
							className={`${styles.outfit__sceneItem} ${styles.outfit__sceneItemTop} `}
							style={{
								backgroundImage: `url(${outfitData.scene.top})`,
								display: `${outfitData.scene.top !== '' ? 'block' : 'none'}`,
							}}
						/>
						<div
							className={`${styles.outfit__sceneItem} ${styles.outfit__sceneItemAccessory} `}
							style={{
								backgroundImage: `url(${outfitData.scene.accessory})`,
								display: `${outfitData.scene.accessory !== '' ? 'block' : 'none'}`,
							}}
						/>
						<div
							className={`${styles.outfit__sceneItem} ${styles.outfit__sceneItemBottom} `}
							style={{
								backgroundImage: `url(${outfitData.scene.bottom})`,
								display: `${outfitData.scene.bottom !== '' ? 'block' : 'none'}`,
							}}
						/>
						<div
							className={`${styles.outfit__sceneItem} ${styles.outfit__sceneItemShoes} `}
							style={{
								backgroundImage: `url(${outfitData.scene.shoes})`,
								display: `${outfitData.scene.shoes !== '' ? 'block' : 'none'}`,
							}}
						/>
					</div>
					<div className={`${styles.outfit__buttons} flex`}>
						<button>edit</button>
						<button onClick={deleteOutfit}>delete</button>
					</div>
				</section>
			)}
		</>
	)
}
