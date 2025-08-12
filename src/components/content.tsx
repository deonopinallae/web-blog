import styled from "styled-components"

const Div = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;`

export const Content: any = ({ children, error }) => {
	return error ? (
		<Div>
			<h2>ошибка</h2>
			<div>{error}</div>
		</Div>
	) : (
		<>{ children }</>
	)
}
