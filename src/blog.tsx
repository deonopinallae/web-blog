import styled from 'styled-components'
import { Routes, Route } from 'react-router'
import { Header, Footer, Modal } from './components'
import { Authorization, Registration, Users, Post, Main } from './pages'
import { useLayoutEffect } from 'react'
import { setUser } from './actions'
import { useDispatch } from 'react-redux'
import { Error } from './components'
import { ERROR } from './constants'

const Page = styled.div`
	padding: 120px 0;
	height: 100%;
`

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
	width: clamp(300px, 69.44vw, 1000px);
	background-color: #fff;
	margin: 0 auto;
`

export const Blog = () => {
	const dispatch = useDispatch()
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) return

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }))
	}, [dispatch])


	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="/*" element={<Error error={ERROR.PAGE_NOT_EXIST}/>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	)
}
