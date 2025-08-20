import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {PostCard} from './components'
import {useServerRequest} from '../../hooks'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
    const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts').then((fetchedPosts) => setPosts(fetchedPosts.res))
	}, [])

	return (
		<div className={className}>
			{posts.map(({ id, imageUrl, title, publishedAt, commentsCount }) => (
				<PostCard key={id} {...{ id, imageUrl, title, publishedAt, commentsCount }} />
			))}
		</div>
	)
}

export const Main: any = styled(MainContainer)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(33px, 3.47vw, 50px);
    margin: 0 clamp(36px, 3.75vw, 54px)`
