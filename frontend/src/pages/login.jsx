import { useContext } from 'react';
import axios from 'axios';
import { API_URI } from '../util';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context';

export function Login() {
	const { register, handleSubmit } = useForm();
	const { dispatch } = useContext(userContext);
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const resp = await axios.post(`${API_URI}/api/auth/login`, data);
		const respData = resp.data;
		const respType = respData.type;
		if (respType === "success") {
			navigate('/dashboard');
			dispatch("LOGIN_SUCCESS");
		}
		else if (respType === "error") dispatch("LOGIN_FAILURE");
	}
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="username" {...register("username")} />
			<input type="password" placeholder="password" {...register("password")} />
			<button type="submit">submit</button>
		</form>
	)
};