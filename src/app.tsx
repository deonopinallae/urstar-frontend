// App.tsx
import { useState, useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router'
import { AppColumn, Header, Footer, Page, Menu } from './components/layout'
import { useDispatch } from 'react-redux'
import { setUser } from './actions'
import { request } from './utils'
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
	Favorites,
	ProductAdd,
} from './pages'

export const App = () => {
	const dispatch = useDispatch()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

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
				.catch(() => {
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
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
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
					<Route path="/add-product" element={<ProductAdd />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/users/:id/combiner" element={<Combiner />} />
					<Route path="/users/:id/outfits/:outfitId" element={<Outfit />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/users" element={<Users />} />
					<Route path="*" element={<Error />} />
					<Route path="/error" element={<Error />} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	)
}


