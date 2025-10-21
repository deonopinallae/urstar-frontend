import { Routes, Route } from 'react-router'
import { AppColumn, Header, Footer, Page } from './components/layout'
import { Main, Catalog, Top, Bottom, Accessory, Shoes, Product, Combine, Outfit } from './pages'

export const App = () => {

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
					<Route path="/catalog/:id" element={<Product />} />
					<Route path="/favorite" element="" />
					<Route path="/combine" element={<Combine/>}/>
					<Route path="/combine/:id" element={<Outfit />} />
					<Route path="/cart" element="" />
					{/* <Route path="/registration" element={<Registration/>} /> */}
					<Route path="/login" element="" />
					<Route path="/user" element="" />
					<Route path="/add-product" element="" />
					<Route path="*" element="" />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	)
}
