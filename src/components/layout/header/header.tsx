import { useState } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const Header = () => {

	return (
		<header className={`${styles.header} flex justify-between items-center`}>

			<Link to="/" className="logo">
				<img src="/assets/icons/logo.svg" alt="logo" />
			</Link>
			<nav
				className={`${styles.header__nav} flex grow items-center justify-center ${/*${isBurgerNavOpen ? styles.closedNav : styles.opendNav}*/ null}`}
			>
				<div
					className={`${styles.header__navLinks} flex justify-center items-center`}
				>
					<Link to="/catalog">catalog</Link>
					<Link to="/catalog/top">top</Link>
					<Link to="/catalog/bottom">bottom</Link>
					<Link to="/catalog/shoes">shoes</Link>
					<Link to="/catalog/accessory">accessory</Link>
					<Link to="/catalog/combine">
						<div>combine</div>
						<div>clothes</div>
					</Link>
				</div>
			</nav>
			<div className={`${styles.header__buttons} flex items-center`}>
				<Link
					to="/favorites"
					className={`${styles.header__button} favorite-button icon-button`}
				><img src="/assets/icons/like.svg" alt="favorite" /></Link>
				<Link to="/cart" className={`${styles.header__button} cart-button icon-button`} ><img src="/assets/icons/cart.svg" alt="cart" /></Link>
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
