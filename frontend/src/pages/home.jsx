import { useContext, useEffect } from 'react';
import { userContext } from '../context';

export function Home() {
	const { username, dispatch } = useContext(userContext);

	// useEffect(() => dispatch({ type: "LOGIN_START", payload: "new user" }), []);
	return (
		<h1>{username}</h1>
	)
};