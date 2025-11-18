import { Products } from '../products'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../../selectors'
import { request } from '../../../utils'
import { setProducts } from '../../../actions'
import { Loader } from '../../../components/ui'
import { useEffect, useState } from 'react'

export const Catalog = () => {
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch()
	const products = useSelector(selectProducts)

	useEffect(() => {
		if (products.length === 0) {
			request('/api/products').then(({ data: { products } }) => {
				dispatch(setProducts(products))
				setIsLoading(false)
			})
		} else {
			setIsLoading(false)
		}
	}, [products.length])

	return isLoading ? <Loader /> : <Products {...{ products }} />
}
