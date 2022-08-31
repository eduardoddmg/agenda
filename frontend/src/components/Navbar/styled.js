import styled from 'styled-components';

export const Navbar = styled.nav`
	padding: 1em 4%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #3182CE;

	a:first-child {
		margin-right: 1em;
	}
	a {
		margin: 0 1em;
		color: white;
		font-weight: bold;
	}
`