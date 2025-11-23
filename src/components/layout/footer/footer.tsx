import { SOCIAL } from '../../../constants/social'
import styles from './styles.module.scss'

export const Footer = () => {
    const currentYear = new Date().getFullYear() 

    return <footer className={`${styles.footer} flex justify-between`}>
      <div className={`${styles.footer__social} flex item-center`}>
        <a href={SOCIAL.EMAIL}>{SOCIAL.EMAIL}</a>
      </div>
      <div>{currentYear}</div>
    </footer>
}