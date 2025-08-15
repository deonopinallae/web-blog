import styled from 'styled-components'
import { Icon } from '../../../components'
import { useState } from 'react'
import { Comment } from './comment'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserLogin } from '../../../selectors'
import { useServerRequest } from '../../../hooks'
import { addCommentAsync } from '../../../actions'

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('')
	const dispatch = useDispatch()
	const userId = useSelector(selectUserLogin)
	const requestServer = useServerRequest()

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content))
		setNewComment('')
	}
	return (
		<div className={className}>
			<div className="new-comment">
				<textarea
					value={newComment}
					onChange={({ target }) => setNewComment(target.value)}
					placeholder="комментарий..."
				></textarea>
				<Icon
					id="fa-send-o"
					onClick={() => onNewCommentAdd(userId, postId, newComment)}
				/>
			</div>
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment key={id} {...{ id, author, content, publishedAt, postId }} />
				))}
			</div>
		</div>
	)
}

export const Comments: any = styled(CommentsContainer)`
	width: clamp(250px, 53.06vw, 764px);
	margin: 0 auto;
	gap: 18px;
	display: flex;
	flex-direction: column;
	& .new-comment {
		display: flex;
		gap: 5px;
	}
	& textarea {
		resize: none;
		padding: 11px;
		width: 100%;
		height: clamp(109px, 11.39vw, 164px);
		border: 1px solid #000;
	}
	& .comments {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
`
