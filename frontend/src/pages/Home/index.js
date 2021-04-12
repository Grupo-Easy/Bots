import React, { useState, useEffect } from 'react';
import {
	Container,
	Login,
	Image,
	Title,
	InputStyle,
	ButtonStyle,
	InputStyleError,
} from './styles';
import api from '../../services/api';

function Home({ history }) {
	const [Username, setUsername] = useState('');
	const [Password, setPassword] = useState('');
	const [Incorrect, setIncorrect] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await api.get('/login', {
				auth: {
					username: Username,
					password: Password,
				},
			});
			localStorage.setItem('jwt', response.data.token);
			history.push('/dashboard');
		} catch (err) {
			setIncorrect(true);
			console.log(err);
		}
	}

	return (
		<>
			<Container>
				<Image />
				<Login onSubmit={handleSubmit}>
					<Title>Login</Title>
					{!Incorrect && (
						<>
							<InputStyle
								placeholder="Username"
								type="text"
								value={Username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								required
							/>
							<InputStyle
								placeholder="Password"
								type="password"
								value={Password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								required
							/>
						</>
					)}
					{Incorrect && (
						<>
							<InputStyleError
								placeholder="Username"
								type="text"
								value={Username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								required
							/>
							<InputStyleError
								placeholder="Password"
								type="password"
								value={Password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								required
							/>
						</>
					)}
					<ButtonStyle type="submit" value="Login" />
				</Login>
			</Container>
		</>
	);
}

export default Home;
