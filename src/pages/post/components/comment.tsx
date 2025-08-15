import styled from 'styled-components'
import { Icon } from '../../../components'

const CommentContainer = ({ className, author, content, publishedAt }) => {
	return (
		<div className={className}>
			<div className="comment__content">
				<div className="comment__info flex between">
					<div className="comment__user flex aic">
						<Icon id="fa-user" size="21px"/>
						<div>{author}</div>
					</div>
					<div className="comment__data flex aic">
						<Icon id="fa-calendar-o" />
						<div>{publishedAt}</div>
					</div>
				</div>

				<div>{content}</div>
			</div>
			<Icon id="fa-trash-o" />
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
		}
			&__user, &__data{
				gap: 5px;
				font-size: clamp(14px, 1.11vw, 16px)
			}
	}
`
