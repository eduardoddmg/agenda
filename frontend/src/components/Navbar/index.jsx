import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context';

export default function Navbar() {
	const { token, dispatch } = useContext(userContext);
	const navigate = useNavigate();

	const logout = () => {
		 dispatch({ type: "LOGOUT" });
		 navigate('/');
	}

	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/dashboard">Dashboard</Link>
			{token && <button onClick={logout}>logout</button>}
		</>
	)
};