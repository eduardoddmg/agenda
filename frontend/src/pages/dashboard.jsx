import { useContext } from 'react';
import { userContext } from '../context';

export function Dashboard() {
	const { username } = useContext(userContext);
	return (
		<>
			<h1>Seja bem-vindo, {username}</h1>
		</>
	)
}