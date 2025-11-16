import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'
import { useDispatch } from 'react-redux'
import { deleteOutfitAsync } from '../../../actions'

export const CombinerOutfitCard = ({ userId, outfit: { _id: id, scene, name } }) => {
	const dispatch = useDispatch()

	return (
		<div className={`${styles.combiner__outfitCard}`}>
			<Link to={`/users/${userId}/outfits/${id}`} className={`${styles.combiner__sceneCard} `}>
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
			</Link>
			<div>{name}</div>
            <button onClick={() => dispatch(deleteOutfitAsync(userId, id))}>delete</button>
		</div>
	)
}
