import { useEffect, useState } from 'react'
import { request } from '../utils'
import { PAGINATION_LIMIT } from '../constants'

export const useGetProducts = () => {
	const [products, setProducts] = useState([])
	const [error, setError] = useState('')
	const [searchPhrase, setSearchPhrase] = useState('')
	const [shouldSearch, setShouldSearch] = useState(false)
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)

	useEffect(() => {
		setError('')
		request(`api/products`)
            .then(({ data: { products } }) => {
                setProducts(products)
            })
            .catch((err) => {
                setError(err.message || 'Unknown network error')
                setProducts([]) 
            })
	}, [])

	return {
		products,
		error,
	}
}
