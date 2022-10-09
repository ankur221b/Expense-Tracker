import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFields } from '../constants/formFields';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;
const fields = loginFields;

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		switch (e.target.id) {
			case 'email-address':
				setEmail(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			default:
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		authenticateUser();
	};

	//Handle Login API Integration here
	const authenticateUser = async () => {
		const userData = {
			email: email,
			password: password,
		};

		const response = await axios.post(`${API_URL}/login`, userData);

		if (response.data.success) {
			loginUser(response.data.username);
		} else {
			toast(response.data.message, { type: 'error' });
		}
	};

	const loginUser = (username) => {
		dispatch({ type: 'LOGIN', username, email });
		toast('Logged in Successfully', { type: 'success' });
		navigate('/home');
	};

	return (
		<>
			<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
				<div className="-space-y-px">
					{fields.map((field) => (
						<Input
							key={field.id}
							handleChange={handleChange}
							labelText={field.labelText}
							labelFor={field.labelFor}
							id={field.id}
							name={field.name}
							type={field.type}
							isRequired={field.isRequired}
							placeholder={field.placeholder}
						/>
					))}
				</div>
				<FormExtra />
				<FormAction handleSubmit={handleSubmit} text="Login" />
			</form>
		</>
	);
}
