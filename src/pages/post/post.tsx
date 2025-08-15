import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PostContent, Comments } from './components'
import { useServerRequest } from '../../hooks'
import { loadPostAsync } from '../../actions'
import { selectPost } from '../../selectors'

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost)
    const dispatch = useDispatch()
    const params = useParams()
    const requestServer = useServerRequest()

	useEffect(() => {
        dispatch(loadPostAsync(requestServer, params.id))
    }, [dispatch, requestServer, params.id])

	return (
		<div className={className}>
			<PostContent {...{post}}/>
			<Comments comments={post.comments} postId={post.id}/>
		</div>
	)
}

export const Post: any = styled(PostContainer)``
