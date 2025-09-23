import { useGetProducts } from '../../../hook'
import styles from './styles.module.scss'

export const Favorite = () => {
	const { products, error } = useGetProducts()

	return <section className={`${styles.favorite}`}>
        <div>Your favorite</div>
        
    </section>
}
