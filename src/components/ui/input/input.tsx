import styles from './styles.module.scss'
import { forwardRef } from 'react'

export const Input = forwardRef(({ ...props }, ref) => <input className={styles.input} {...props}  ref={ref} />)