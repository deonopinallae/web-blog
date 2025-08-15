import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Navigate } from 'react-router'
import styled from 'styled-components'
import { server } from '../bff'
import { useState } from 'react'
import { useDispatch, useStore, useSelector } from 'react-redux'
import { Button, Input, FormError } from '../components'
import { setUser } from '../actions'
import { selectUserRole } from '../selectors'
import { ROLE } from '../constants'
import { useResetForm } from '../hooks'

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
			'неверно заполнен пароль. допускаются буквы, цифры и знаки #, %'
		)
		.min(8, 'неверно заполнен пароль. минимум 8 символов.')
		.max(20, 'неверно заполнен пароль. максимум 20 символов.'),
	confirmPassword: yup
		.string()
		.required('подтвердите пароль')
		.oneOf([yup.ref('password')], 'пароли не совпадают')
})



const RegistrationContainer = ({ className }) => {
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

    useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`ошибка запроса: ${error}`)
				return
			}
			dispatch(setUser(res))
			sessionStorage.setItem('userData', JSON.stringify(res))
		})
	}
	const formError = errors?.login?.message || errors?.password?.message || errors?.confirmPassword?.message
	const errorMessage = formError || serverError
	const roleId = useSelector(selectUserRole)

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
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
			<Button type="submit" disabled={!!formError}>
				зарегестрироваться
			</Button>
			{errorMessage && <FormError>{errorMessage}</FormError>}
		</form>
	)
}

export const Registration: any = styled(RegistrationContainer)`
	margin: clamp(20px, 2.08vw, 30px) auto;
	width: clamp(250px, 20.83vw, 300px);
	display: flex;
	flex-direction: column;
	gap: clamp(1px, 1.39vw, 20px);
	text-align: center;
`
