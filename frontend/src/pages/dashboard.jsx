import { useState, useContext, useCallback } from 'react';
import { userContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { API_URI } from '../util';
import axios from 'axios';

function Form({ setShowForm, type, defaultForm }) {
	const { token, dispatch } = useContext(userContext);
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		data.idUser = token;
		console.log(token);
		if (type) {
			const resp = await axios.put(`${API_URI}/api/contact/updateContact`, data);
			console.log(resp);
		} else {
			const resp = await axios.post(`${API_URI}/api/contact/createContact`, data);
			console.log(resp);
		}
		const resp = await axios.get(`${API_URI}/api/contact/readContact?idUser=${token}`);
		const contacts = resp.data.data;
		dispatch({ type: "ADD_CONTACT", payload: { contacts, token }});
		setShowForm(false);
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="name" {...register("name")} defaultValue={defaultForm.name} />
			<input type="number" placeholder="phoneNumber" {...register("phoneNumber")} defaultValue={defaultForm.phoneNumber} />
			<input type="email" placeholder="email" {...register("email")} defaultValue={defaultForm.email} />
			<button type="submit">submit</button>
		</form>
	)
}

export function Dashboard() {
	const defaultFormInitialValue = { name: '', phoneNumber: '', email: '' };

	const [showForm, setShowForm] = useState(false);
	const [type, setType] = useState(0);
	const [defaultForm, setDefaultForm] = useState(defaultFormInitialValue);
	const { username, token, contacts, loading } = useContext(userContext);
	const navigate = useNavigate();

	const createContact = () => {
		setShowForm(true);
		setType(0);
		setDefaultForm(defaultFormInitialValue);
	};

	const editContact = (data) => {
		setShowForm(true);
		setType(1);
		setDefaultForm(data);
	};

	return (
		<>
			{loading ? <h1> carregando... </h1> : <>
				<h1>Seja bem-vindo {username}</h1>
				<button onClick={createContact}>criar</button>
				<ul>
					{contacts.map((contact, index) => {
						return (
							<li key={index}>
								<p>{contact.name}</p>
								<button onClick={() => editContact(contact)}>edit</button>
								<button>delete</button>
							</li>
						)
					})}
				</ul>
				<button onClick={() => setShowForm(false)}>close form</button>
				{showForm && <Form setShowForm={setShowForm} type={type} defaultForm={defaultForm} />}
			</>}
		</>
	)
}