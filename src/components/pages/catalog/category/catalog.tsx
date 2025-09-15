import { Category } from '../category'
import { useGetProducts } from '../../../../hook'

export const Catalog = () => {
	const { products, error } = useGetProducts()
	return <Category {...{ products, error}}/>	
}
