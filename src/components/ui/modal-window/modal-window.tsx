import styles from './styles.module.scss'

export const ModalWindow = ({ text, action, setIsModalOpen }) => {
	return (
		<div className={styles.modalWindow}>
			<div className={`${styles.modalWindow__text}`}>{text}</div>
            <div className={`${styles.modalWindow__buttons} flex justify-between`}>
            <button onClick={() => setIsModalOpen(false)}>cancel</button>
            <button onClick={action}>yes</button>
            </div>
		</div>
	)
}
