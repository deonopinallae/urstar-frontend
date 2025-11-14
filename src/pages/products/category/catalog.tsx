import { Products } from '../products'
import { request } from '../../../utils'
import { useEffect, useState } from 'react'
import { Loader } from '../../../components/ui'

export const Catalog = () => {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		request('/api/products').then(({ data: { products } }) => {
			setProducts(products)
			setIsLoading(false)
		})
	}, [])

	return isLoading ? <Loader/> : <Products {...{ products }} />
}
