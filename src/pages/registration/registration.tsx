import styles from './styles.module.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../../components/ui'
import { setUser } from '../../actions'
import { selectUserRole } from '../../selectors'
import { ROLE } from '../../constants'
import { useResetForm } from '../../hooks'
import { request } from '../../utils'

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('введите логин')
		.matches(/^\w+$/, 'неверно заполнен логин. допускаются только буквы и цифры.')
		.min(3, 'неверно заполнен логин. минимум 3 символа.')
		.max(15, 'неверно заполнен логин. максимум 15 символов.'),
	password: yup
		.string()
		.required('введите пароль')
		.matches(
			/^[\w#%]+$/,
			'неверно заполнен пароль. допускаются буквы, цифры и знаки #, %',
		)
		.min(8, 'неверно заполнен пароль. минимум 8 символов.')
		.max(20, 'неверно заполнен пароль. максимум 20 символов.'),
	confirmPassword: yup
		.string()
		.required('подтвердите пароль')
		.oneOf([yup.ref('password')], 'пароли не совпадают'),
})

export const Registration = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(regFormSchema),
	})
	const [serverError, setServerError] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useResetForm(reset)

	const onSubmit = ({ login, password }: { login: string; password: string }) => {
		request('/api/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`${error}`)
				return
			}
			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
			navigate(-1)
		})
	}
	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.confirmPassword?.message
	const errorMessage = formError || serverError
	const roleId = useSelector(selectUserRole)

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2>регистрация</h2>
			<Input
				{...register('login', { onChange: () => setServerError('') })}
				placeholder="логин"
				type="text"
			/>
			<Input
				{...register('password', { onChange: () => setServerError('') })}
				placeholder="пароль"
				type="password"
			/>
			<Input
				{...register('confirmPassword', { onChange: () => setServerError('') })}
				placeholder="подтвердите пароль"
				type="password"
			/>
			<button type="submit" disabled={!!formError}>
				зарегестрироваться
			</button>
			{errorMessage && <div className={styles.form__error}>{errorMessage}</div>}
		</form>
	)
}
