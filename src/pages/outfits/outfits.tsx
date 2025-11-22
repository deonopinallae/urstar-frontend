import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { selectUserOutfits } from '../../selectors'
import { OutfitCard } from './outfit-card/outfit-card' 

export const Outfits = () => {
	const outfits = useSelector(selectUserOutfits)

	return (
		<div className={`${styles.outfits}`}>
			{outfits.map((outfit) => (
				<OutfitCard outfit={outfit} />
			))}
		</div>
	)
}
