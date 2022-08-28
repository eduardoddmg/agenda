import { useState, useContext, useEffect } from 'react';
import { userContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { API_URI } from '../util';
import axios from 'axios';



function Form({ setShowForm, type, defaultForm }) {
	const { token, dispatch, getContact } = useContext(userContext);
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		data.idUser = token;
		data._id = defaultForm._id; 
		console.log(token);
		if (type) {
			const resp = await axios.put(`${API_URI}/api/contact/updateContact`, data);
			console.log(resp);
		} else {
			const resp = await axios.post(`${API_URI}/api/contact/createContact`, data);
			console.log(resp);
		}
		getContact(token, dispatch);
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
	const { username, token, contacts, loading, dispatch, firstLogin, getContact } = useContext(userContext);
	const navigate = useNavigate();

	useEffect(() => {
		firstLogin();
		!token && navigate('/');
	}, []);

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

	const deleteContact = async(data) => {
		const resp = await axios.delete(`${API_URI}/api/contact/deleteContact?idContact=${data._id}`);
		getContact(token, dispatch);
	}

	return (
		<>
			{loading ? <h1> carregando... </h1> : <>
				<h1>Seja bem-vindo {username}</h1>
				<button onClick={createContact}>criar</button>
				<ul>
					{contacts && contacts.map((contact, index) => {
						return (
							<li key={index}>
								<p>{contact.name}</p>
								<button onClick={() => editContact(contact)}>edit</button>
								<button onClick={() => deleteContact(contact)}>delete</button>
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