import styled from 'styled-components'
import { Routes, Route } from 'react-router'
import { Header, Footer, Modal } from './components'
import { Authorization, Registration, Users, Post } from './pages'
import { useLayoutEffect } from 'react'
import { setUser } from './actions'
import { useDispatch } from 'react-redux'

const Page = styled.div`
	padding: 120px 0;
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
					<Route path="/" element={<div>main</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>new post</div>} />
					<Route path="/posts/:id" element={<Post />} />
					<Route path="/posts/:id/edit" element={<Post />} />
					<Route path="/*" element={<div>error</div>} />
				</Routes>
			</Page>
			<Footer />
			<Modal/>
		</AppColumn>
	)
}
