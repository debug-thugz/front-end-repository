import { Button, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import './contentcards.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Comments({ title, body, createdAt, id, getPost }) {
	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`https://redoit-api.herokuapp.com/comments/${String(id)}`
			);
			if (response.status === 204) {
				getPost();
				navigate(`/comments/${String(id)}`);
			}
		} catch (error) {}
	};

	return (
		<Card className='form mt-3'>
			<Card.Header className='header'>
				<div className='d-flex flex-column justify-content-start align-items-start'>
					<span>Posted at: {createdAt}</span>
				</div>
				<DropdownButton
					className='drop-down'
					id='dropdown-basic-button'
					title=''>
					<Dropdown.Item onClick={handleDelete} href='#/action-1'>
						Delete comment
					</Dropdown.Item>
				</DropdownButton>
			</Card.Header>
			<Card.Body className='cardBody'>
				<Card.Text>{body}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default Comments;
