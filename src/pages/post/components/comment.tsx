import styled from 'styled-components'
import { Icon } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, CLOSE_MODAL, removeCommentAsync } from '../../../actions'
import { selectUserRole } from '../../../selectors'
import { ROLE } from '../../../constants'
import PropTypes from 'prop-types'

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch()
	const userRole = useSelector(selectUserRole)

	const onNewCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync( postId, id))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)

	return (
		<div className={className}>
			<div className="comment__content column">
				<div className="comment__info flex between">
					<div className="comment__user flex aic">
						<Icon inactive={true} id="fa-user" size="20px" />
						<div>{author}</div>
					</div>
					<div className="comment__data flex aic">
						<Icon inactive={true} id="fa-calendar-o" size="16px" />
						<div>{publishedAt}</div>
					</div>
				</div>

				<div>{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon id="fa-trash-o" onClick={() => onNewCommentRemove(id)} />
			)}
		</div>
	)
}

export const Comment: any = styled(CommentContainer)`
	width: clamp(250px, 53.06vw, 764px);
	margin: 0 auto;
	display: flex;
	gap: 9px;

	& .comment {
		&__content {
			padding: 5px 18px 10px 7px;
			width: 100%;
			border: 1px solid #000;
			font-size: clamp(16px, 1.25vw, 18px);
			gap: 5px;
		}
		&__user,
		&__data {
			gap: 5px;
			font-size: clamp(14px, 1.11vw, 16px);
		}
	}
`

Comment.PropTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
}
