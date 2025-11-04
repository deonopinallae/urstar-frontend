import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLogin, selectUserRole, selectUserId } from '../../../selectors'
import { ROLE } from '../../../constants'
import { logout } from '../../../actions'
import { checkAccess } from '../../../utils'

export const Header = () => {
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
					<Link to={`/users/${userId}/combiner`}>
						<div>combine</div>
						<div>clothes</div>
					</Link>
				</div>
			</nav>
			<div className={`${styles.header__buttons} flex items-center`}>
				{isAdmin && <Link to="/users">users</Link>}
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
					<div>
						<div>{login}</div>
						<div onClick={onLogout}>logout</div>
					</div>
				)}
			</div>
		</header>
	)
}
