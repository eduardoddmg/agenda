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
		const respUser = await axios.post(`${API_URI}/api/auth/login`, data);
		const respUserData = respUser.data;
		const userData = respUserData.data;
		const respType = respUserData.type;
		const respContacts = await axios.get(`${API_URI}/api/contact/readContact?idUser=${userData._id}`);
		const respContactsData = respContacts.data;
		const respContactsType = respContactsData.type;
		const contacts = respContactsData.data;
		if (respType === "success") {
			navigate('/dashboard');
			dispatch({type: "LOGIN_SUCCESS", payload: { id: userData._id, username: userData.username, contacts }});
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