import { useState, useContext, useEffect } from 'react';
import { userContext } from '../context';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
	const [loading, setLoading] = useState(true);
	const { username, id } = useContext(userContext);
	const navigate = useNavigate();

	useEffect(() => id ? setLoading(false) : navigate('/'), []);
	return (
		<>
			{loading ? <h1> carregando... </h1> : <h1>Seja bem-vindo, {username}</h1>}
		</>
	)
}