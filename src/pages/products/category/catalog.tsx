import { Category } from '../category'
import { useGetProducts } from '../../../hooks'

export const Catalog = () => {
	const { products, error } = useGetProducts()
	return <Category {...{ products, error}}/>	
}
