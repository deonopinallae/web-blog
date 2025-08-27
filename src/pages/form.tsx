import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Navigate } from 'react-router'
import styled from 'styled-components'
import { server } from '../bff'
import { useEffect, useState } from 'react'
import { useDispatch, useStore, useSelector } from 'react-redux'
import { Button, Input } from '../components'
import { setUser } from '../actions'
import { selectUserRole } from '../selectors'
import { ROLE } from '../constants'

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

const ErrorMessage = styled.div`
    background-color: #fcadad;
    padding: clamp(7px, 0.69vw, 10px);
    width: 100%;
    text-align: left;
`

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
        },
        resolver: yupResolver(authFormSchema),
    })
    const [serverError, setServerError] = useState('')
    const dispatch = useDispatch()
    const store = useStore()

    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout

        return store.subscribe(() => {
            let prevWasLogout = currentWasLogout
            currentWasLogout = store.getState().app.wasLogout
            if (currentWasLogout !== prevWasLogout) {
                reset()
            }
        })
    }, [reset, store])

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`ошибка запроса: ${error}`)
                return
            }
            dispatch(setUser(res))
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
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Link className="link" to={'/register'}>
                регистрация
            </Link>
        </form>
    )
}

export const Authorization: any = styled(AuthorizationContainer)`
    margin: clamp(20px, 2.08vw, 30px) auto;
    width: clamp(250px, 20.83vw, 300px);
    display: flex;
    flex-direction: column;
    gap: clamp(1px, 1.39vw, 20px);
    text-align: center;
`
