import styled from 'styled-components'
import { Routes, Route } from 'react-router'
import { Header, Footer } from './components'
import { Authorization, Registration } from './pages'

const Content = styled.div`
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
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<div>main</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<div>users</div>} />
					<Route path="/post" element={<div>new post</div>} />
					<Route path="/post/:postId" element={<div>post</div>} />
					<Route path="/*" element={<div>error</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	)
}
