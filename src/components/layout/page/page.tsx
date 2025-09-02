import styles from './styles.module.scss'

export const Page = ({children}) => {
	return <div className={`${styles.page} min-h-full flex grow`}>{children}</div>
}