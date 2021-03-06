import './CommentsPage.css';
import { useState, useEffect } from 'react';
import './contentcards.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import './contentcards.css';
import Form from 'react-bootstrap/Form';
import Comments from './Comments';

function CommentsPage({ id }) {
	const navigate = useNavigate();
	const params = useParams();

	const [currentPost, setCurrentPost] = useState([]);

	//fetch all the posts
	const getPost = async () => {
		try {
			const res = await axios.get(
				`https://redoit-api.herokuapp.com/api/posts/${String(params.id)}`
			);
			let data = res.data;
			setCurrentPost(data);
			setCurrentComments(data.comments.reverse());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPost();
	}, []);

	const [currentComments, setCurrentComments] = useState([]);

	const initialCommentState = {
		title: '',
		body: '',
	};

	const [commentState, setCommentState] = useState(initialCommentState);

	function handleChange(event) {
		setCommentState({ ...commentState, [event.target.id]: event.target.value });
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'https://redoit-api.herokuapp.com/comments',
				{ ...commentState, postId: params.id }
			);
			if (response.status === 200) {
				getPost();
				setCommentState(initialCommentState);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = async () => {
		navigate(`/editpost/${String(params.id)}`);
	};

	return (
		<div>
			<div className='cards'>
				<Card className='form mt-3'>
					<Card.Header className='header'>
						<div className='d-flex flex-column justify-content-start align-items-start'>
							<span>Posted at: {currentPost.createdAt}</span>
						</div>
						<DropdownButton
							className='drop-down'
							id='dropdown-basic-button'
							title=''>
							<Dropdown.Item onClick={handleEdit} value={id} href='#/action-2'>
								Edit Post
							</Dropdown.Item>
						</DropdownButton>
					</Card.Header>
					<Card.Body className='cardBody'>
						<Card.Title>{currentPost.title}</Card.Title>
						<Card.Text>{currentPost.body}</Card.Text>

						<br />
						<hr />

						<div className=''>
							<span className='d-flex p-1'>Make a comment</span>

							<Form
								className='form d-flex flex-column p-2 gap-2 mt-2 mb-5'
								onSubmit={handleSubmit}>
								<Form.Group controlId='body'>
									<Form.Control
										className='body-input d-flex justify-content-start'
										type='text'
										placeholder='Your Comment'
										onChange={handleChange}
										value={commentState.body}
									/>
								</Form.Group>

								<div className='d-flex justify-content-end'>
									<button className='btn'>Comment</button>
								</div>
							</Form>

							<span className='d-flex comments-title'>Comments</span>
							<div>
								{currentComments.map((comment) => {
									return (
										<Comments
											body={comment.body}
											createdAt={comment.createdAt}
											id={comment._id}
											getPost={getPost}
											key={comment._id}
										/>
									);
								})}
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

export default CommentsPage;
