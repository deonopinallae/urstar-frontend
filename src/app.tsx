import { Routes, Route } from 'react-router'
import { AppColumn, Header, Footer, Page } from './components/layout'
import { Main, Catalog } from './components/pages'

export const App = () => {
	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/product" element="" />
					<Route path="/favorite" element="" />
					<Route path="/combine" element="" />
					<Route path="/cart" element="" />
					<Route path="/registration" element="" />
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
