import { Routes, Route } from 'react-router'
import { AppColumn, Header, Footer, Page } from './components/layout'
import {
	Main,
	Catalog,
	Top,
	Bottom,
	Accessory,
	Shoes,
	Product,
	ProductEdit,
	Combiner,
	Outfit,
	Registration,
	Authorization,
	Cart,
	Users,
	Error,
	Favorites
} from './pages'
import { useLayoutEffect } from 'react'
import { setUser } from './actions'
import { useDispatch } from 'react-redux'
import { request } from './utils'

export const App = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		const currentUserData = JSON.parse(currentUserDataJSON)

		if (currentUserData?.id) {
			request(`/api/users/${currentUserData.id}`)
				.then(({ data }) => {
					if (data) {
						dispatch(setUser({ ...data, roleId: Number(data.roleId) }))
					} else {
						dispatch(
							setUser({
								...currentUserData,
								roleId: Number(currentUserData.roleId),
							}),
						)
					}
				})
				.catch((err) => {
					console.error('user load error: ', err)
					dispatch(
						setUser({
							...currentUserData,
							roleId: Number(currentUserData.roleId),
						}),
					)
				})
		}
	}, [dispatch])


	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/catalog/top" element={<Top />} />
					<Route path="/catalog/bottom" element={<Bottom />} />
					<Route path="/catalog/accessory" element={<Accessory />} />
					<Route path="/catalog/shoes" element={<Shoes />} />
					<Route path="/products/:id" element={<Product />} />
					<Route path="/products/:id/edit" element={<ProductEdit />} />
					<Route path="/favorites" element={<Favorites/>} />
					<Route path="/users/:id/combiner" element={<Combiner />} />
					<Route path="/users/:id/outfits/:outfitId" element={<Outfit />} />
					<Route path="/:id/cart" element={<Cart />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/users" element={<Users />} />
					<Route path="/add-product" element="" />
					<Route path="*" element={<Error />} />
					<Route path="/error" element={<Error />} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	)
}
