import styled from 'styled-components'
import { Button } from './button'
import { useSelector } from 'react-redux'
import {
	selectModalIsOpen,
	selectModalText,
	selectModalOnConfirm,
	selectModalCancel,
} from '../selectors'

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen)
	const text = useSelector(selectModalText)
	const onConfirm = useSelector(selectModalOnConfirm)
	const onCancel = useSelector(selectModalCancel)

	if (!isOpen) return null

	return (
		<div className={className}>
			<div className="overlay">
				<div className="modal column">
					<h3>{text}</h3>
					<div className="modal__buttons flex">
						<Button onClick={onConfirm}>да</Button>
						<Button onClick={onCancel}>отмена</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Modal: any = styled(ModalContainer)`
	& .modal {
		width: 300px;
		margin: auto;
		background-color: #fff;
		gap: 10px;
		padding: 20px;
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		border: 1px solid #000;
	}
	& .modal__buttons {
		gap: 10px;
	}
	& .overlay {
		position: fixed;
		z-index: 20;
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
		background-color: #00000025;
	}
`
