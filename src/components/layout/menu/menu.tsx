// Menu.tsx
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { checkAccess } from '../../../utils'
import { ROLE } from '../../../constants'
import { useSelector } from 'react-redux'
import { selectUserId, selectUserRole } from '../../../selectors'

export const Menu = ({ isOpen, setIsOpen }) => {
	if (!isOpen) return null
	const roleId = useSelector(selectUserRole)
	const userId = useSelector(selectUserId)
	const isAdmin = checkAccess([ROLE.ADMIN], roleId)

	return (
		<div className={styles.menu}>
			<button className={styles.menu__close} onClick={() => setIsOpen(false)}>
				X
			</button>
			<nav className={styles.menu__nav}>
				<Link to="/catalog" onClick={() => setIsOpen(false)}>
					catalog
				</Link>
				<Link to="/catalog/top" onClick={() => setIsOpen(false)}>
					top
				</Link>
				<Link to="/catalog/bottom" onClick={() => setIsOpen(false)}>
					bottom
				</Link>
				<Link to="/catalog/shoes" onClick={() => setIsOpen(false)}>
					shoes
				</Link>
				<Link to="/catalog/accessory" onClick={() => setIsOpen(false)}>
					accessory
				</Link>
				<Link to={roleId === ROLE.GUEST ? `/login` : `/users/${userId}/combiner`} onClick={() => setIsOpen(false)}>
					combine clothes
				</Link>
				{isAdmin && <Link to="/users" onClick={() => setIsOpen(false)}>users</Link>}
				{isAdmin && <Link to="/add-product" onClick={() => setIsOpen(false)}>add product</Link>}
			</nav>
		</div>
	)
}
