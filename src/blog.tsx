import styled from 'styled-components'
import { Routes, Route } from 'react-router'

const Content = styled.div`
  padding: 120px 0;
`

const H2 = styled.h2`
  text-align: center;
`

const Header = () => <div>шапка</div>
const Footer = () => <div>футер</div>

export const Blog = () => {
	return (
		<>
			<Header />
			<Content>
				<H2>Контент страницы</H2>
				<Routes>
					<Route path="/" element={<div>main</div>} />
					<Route path="/login" element={<div>login</div>} />
					<Route path="/register" element={<div>register</div>} />
					<Route path="/users" element={<div>users</div>} />
					<Route path="/post" element={<div>new post</div>} />
					<Route path="/post/:postId" element={<div>post</div>} />
					<Route path="/*" element={<div>error</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	)
}
