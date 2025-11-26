// Header.tsx
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLogin, selectUserRole, selectUserId } from '../../../selectors'
import { ROLE } from '../../../constants'
import { logout } from '../../../actions'
import { checkAccess } from '../../../utils'
import styles from './styles.module.scss'

export const Header = ({ isMenuOpen, setIsMenuOpen }) => {
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)
	const userId = useSelector(selectUserId)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)

	const onLogout = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
	}

	return (
		<header className={styles.header}>
			<Link to="/">
				<img className="logo" src="/assets/icons/logo.svg" alt="logo" />
			</Link>

			<nav className={styles.header__nav}>
				<Link to="/catalog">catalog</Link>
				{!isAdmin && (
					<>
						<Link to="/catalog/top">top</Link>
						<Link to="/catalog/bottom">bottom</Link>
						<Link to="/catalog/shoes">shoes</Link>
						<Link to="/catalog/accessory">accessory</Link>
					</>
				)}
				<Link to={roleId === ROLE.GUEST ? `/login` : `/users/${userId}/combiner`}>
					combine clothes
				</Link>
			</nav>
			{isAdmin && (
				<Link className={styles.header__menuBtns} to="/users" onClick={() => setIsMenuOpen(false)}>
					users
				</Link>
			)}
			{isAdmin && (
				<Link className={styles.header__menuBtns} to="/add-product" onClick={() => setIsMenuOpen(false)}>
					add product
				</Link>
			)}
			<div className={styles.header__buttons}>
				<Link
					to={roleId === ROLE.GUEST ? `/login` : `/favorites`}
					className={`${styles.header__button} favorite-button icon-button`}
				>
					<img src="/assets/icons/like.svg" alt="favorite" />
				</Link>

				<Link
					to={roleId === ROLE.GUEST ? `/login` : `/cart`}
					className={`${styles.header__button} cart-button icon-button`}
				>
					<img src="/assets/icons/cart.svg" alt="cart" />
				</Link>

				{roleId === ROLE.GUEST ? (
					<Link
						to="/login"
						className={`${styles.header__button} ${styles.header__buttonLogin}`}
					>
						sign in
					</Link>
				) : (
					<div onClick={onLogout}>{login} / logout</div>
				)}
			</div>

			<button
				className={styles.header__burgerButton}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</header>
	)
}
