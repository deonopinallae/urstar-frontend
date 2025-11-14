import styles from './styles.module.scss'

export const Alert = ({text}) => {

    return <div className={`${styles.alert}`}>
      {text}
    </div>
}