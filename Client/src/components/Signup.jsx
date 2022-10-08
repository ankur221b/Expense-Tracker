import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupFields } from '../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;
const fields = signupFields;

export default function Signup() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		switch (e.target.id) {
			case 'email-address':
				setEmail(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			case 'confirm-password':
				setConfirmPassword(e.target.value);
				break;
			case 'username':
				setUsername(e.target.value);
				break;
			default:
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createAccount();
	};

	//handle Signup API Integration here
	const createAccount = async () => {
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		const userData = {
			username: username,
			email: email,
			password: password,
		};
		const response = await axios.post(`${API_URL}/signup`, userData);

		if (response.data === 'ok') {
			toast('User created', { type: 'success' });
			navigate('/');
		} else {
			toast(response.data, { type: 'error' });
		}
	};

	return (
		<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
			<div className="">
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
				<FormAction handleSubmit={handleSubmit} text="Signup" />
			</div>
		</form>
	);
}
