import { useState } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const Header = () => {
	// const [isBurgerNavOpen, setIsBurgerNavOpen] = useState(true)

	// const onMenuToggle = () => setIsBurgerNavOpen(!isBurgerNavOpen)
	return (
		<header className={`${styles.header} flex justify-between items-center`}>
			{/* <button onClick={onMenuToggle} className={`${styles.header__burgerButton} flex-col`}>
				<div />
				<div />
				<div />
			</button> */}
			<Link to="/" className="logo">
				<img src="src/assets/logo.svg" alt="logo" />
			</Link>
			<nav
				className={`${styles.header__nav} flex grow items-center justify-center ${/*${isBurgerNavOpen ? styles.closedNav : styles.opendNav}*/ null}`}
			>
				{/* <button onClick={onMenuToggle} className={`${styles.header__navCloseButton} icon-button`}><img src="src/assets/close.svg" alt="close" /></button> */}
				<div
					className={`${styles.header__navLinks} flex justify-center items-center`}
				>
					<Link to="/catalog">catalog</Link>
					<Link to="/catalog/top">top</Link>
					<Link to="/catalog/bottom">bottom</Link>
					<Link to="/catalog/shoes">shoes</Link>
					<Link to="/catalog/accessories">accessories</Link>
					<Link to="/catalog/combine">
						<div>combine</div>
						<div>clothers</div>
					</Link>
				</div>
			</nav>
			<div className={`${styles.header__buttons} flex items-center`}>
				<Link
					to="/favorites"
					className={`${styles.header__button} favorite-button icon-button`}
				><img src="src/assets/like.svg" alt="favorite" /></Link>
				<Link to="/cart" className={`${styles.header__button} cart-button icon-button`} ><img src="src/assets/cart.svg" alt="cart" /></Link>
				<Link
					to="/login"
					className={`${styles.header__button} ${styles.header__buttonLogin}`}
				>
					sign in
				</Link>
			</div>
		</header>
	)
}
