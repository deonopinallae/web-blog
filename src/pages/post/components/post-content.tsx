import styled from 'styled-components'
import { Icon } from '../../../components'
import { useNavigate } from 'react-router'
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../actions'
import { useDispatch } from 'react-redux'
import { useServerRequest } from '../../../hooks'

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()
	const navigate = useNavigate()

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => navigate('/'))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	return (
		<div className={className}>
			<img src={imageUrl} />
			<h1 className="post__title">{title}</h1>
			<div className="post__content flex between">
				<div className="post__date">
					<Icon  inactive={true} id="fa-calendar-o" />
					<div>{publishedAt}</div>
				</div>
				<div className="post__btns flex">
					<Icon id="fa-edit" onClick={() => navigate(`/post/${id}/edit`)} />
					<Icon id="fa-trash-o" onClick={() => onPostRemove(id)} />
				</div>
			</div>
			<p className="post__text">{content}</p>
		</div>
	)
}

export const PostContent: any = styled(PostContentContainer)`
	padding: clamp(27px, 2.78vw, 40px) clamp(53px, 5.56vw, 80px);
	& .post__date {
		display: flex;
		gap: 10px;
		align-items: center;
		margin: 20px 27px 20px 0;
	}
	& .post__btns {
		gap: 20px;
		align-items: center;
	}
	& .post__text {
		white-space: pre-line;
	}
	& img {
		width: 200px;
		float: left;
		margin: 0 20px 10px 0;
	}
`
