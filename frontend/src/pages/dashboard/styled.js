import styled from 'styled-components';
import { Container as ContainerGeral, Form as FormGeral } from '../../styles/geral';


export const Container = styled(ContainerGeral)`
	padding: 1em 4%;
	h1 {
		font-size: 25px;
		margin: 1em 0;
	}

	button {
		margin-bottom: 10em 0;
	}
`;

export const Form = styled(FormGeral)``;

export const Button = styled.button`
	color: white;
	font-weight: bold;

	* {
		font-weight: bold;
		font-size: 20px;
		color: ${props => props.color};
	}
`