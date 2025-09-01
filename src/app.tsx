import { Routes, Route } from 'react-router'
import { AppColumn, Header, Footer } from './components'
import { Main } from './components/pages'

export const App = () => {
	return (
		<AppColumn>
			<Header />
				<Routes>
					<Route path="/" element={<Main/>} />
					<Route path="/catalog" element="" />
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
			<Footer />
		</AppColumn>
	)
}
