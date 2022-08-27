import axios from 'axios';
import { useEffect } from 'react';
import { API_URI } from '../util';
import { useForm } from 'react-hook-form';

export function Register() {
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		const resp = await axios.post(`${API_URI}/api/auth/register`, data);
		console.log(resp);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="username" {...register("username")} />
			<input type="password" placeholder="password" {...register("password")} />
			<input type="email" placeholder="email" {...register("email")} />
			<button type="submit">submit</button>
		</form>
	)
};