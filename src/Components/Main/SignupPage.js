import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage(props) {
	const navigate = useNavigate();
	const initialFormState = {
		name: '',
		email: '',
		password: '',
	};

	const [formState, setFormState] = useState(initialFormState);

	function handleChange(event) {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	}
	
	function handleLogIn(event) {
		event.preventDefault();
		navigate('/login')
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		// Write your POST fetch() or axios() request here
		try {
			const response = await axios.post(
				'https://redoit-api.herokuapp.com/api/users/signup',
				formState
			);
			if (response.status === 201) {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container
			id='main-container'
			className='signup-form-container'>
			<Form
				onSubmit={handleSubmit}
				id='sign-in-form'
				className='text-center w-100 form mt-5'
				style={{
					padding: '1em 3em',
				}}>
				<h1 className='mb-5 fs-3 fw-normal'>Please Sign up</h1>
				<Form.Group controlId='name'>
					<Form.Control
						type='text'
						size='lg'
						placeholder='Your Name'
						className='position-relative mb-1 input'
						value={formState.name}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Control
						type='email'
						size='lg'
						placeholder='Email address'
						className='position-relative mb-1 input'
						value={formState.email}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Control
						type='password'
						size='lg'
						placeholder='Password'
						autoComplete='current-password'
						className='position-relative mb-4 input input-hover'
						value={formState.password}
						onChange={handleChange}
					/>
				</Form.Group>

				<div className='button-box'>
					<div className='d-grid mb-5 signup button '>
						<button className='btn' type='button' onClick={handleLogIn}>
							<p className='signup-text'>Already have an account?</p>
							<p>
								Log in!
							</p>
						</button>
					</div>
					<div className='d-grid mb-5 signin button'>
						<button className='btn' type='submit'>
							Sign Up
						</button>
					</div>
				</div>
			</Form>
		</Container>
	);
}

export default SignupPage;
