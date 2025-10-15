import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Navigate } from 'react-router'
import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, FormError } from '../components'
import { setUser } from '../actions'
import { selectUserRole } from '../selectors'
import { ROLE } from '../constants'
import { useResetForm } from '../hooks'
import { request } from '../utils'

const authFormSchema = yup.object().shape({
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
})

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: 'leebit',
			password: 'allin006',
		},
		resolver: yupResolver(authFormSchema),
	})
	const [serverError, setServerError] = useState('')
	const dispatch = useDispatch()

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		request('/api/login', 'POST',  {login, password}).then(({ error, user }) => {
			if (error) {				
				setServerError(`ошибка запроса: ${error}`)
				return
			}
			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
		})
	}
	const formError = errors?.login?.message || errors?.password?.message
	const errorMessage = formError || serverError
	const roleId = useSelector(selectUserRole)

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>
	}

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<h2>авторизация</h2>
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
			<Button type="submit" disabled={!!formError}>
				авторизоваться
			</Button>
			{errorMessage && <FormError>{errorMessage}</FormError>}

			<Link className="link" to={'/register'}>
				регистрация
			</Link>
		</form>
	)
}

export const Authorization: any = styled(AuthorizationContainer)`
	margin: clamp(20px, 2.08vw, 30px) auto;
	width: clamp(250px, 20.83vw, 300px);
	gap: clamp(1px, 1.39vw, 20px);
	text-align: center;
	display: flex;
	flex-direction: column;
`
