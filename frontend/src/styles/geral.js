import styled from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: 5vh auto;

	border: ${props => props.noBorder ? "none" : "1px solid black"};
	width: ${props => props.w || "40%"};

	padding: 2em 4em;

	button {
		margin-top: 2em;
	}

	h1 {
		font-size: 25px;
		margin-bottom: 1em;
	}

	input {
		margin: 0.5em 0;
	}

`;

export const Container = styled.section`
	padding: 1em;
`