import styled from 'styled-components'
import { Routes, Route } from 'react-router'
import {Header} from './components'

const Content = styled.div`
  padding: 120px 0;
`

const H2 = styled.h2`
  text-align: center;
`

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  width: clamp(300px, 69.44vw, 1000px);
  background-color: #fff;
  margin: 0 auto 
`

const Footer = () => <div>футер</div>

export const Blog = () => {
	return (
		<AppColumn>
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
		</AppColumn>
	)
}
