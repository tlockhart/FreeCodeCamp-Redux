import React from 'react';
import { useDispatch } from 'react-redux';
import {toggleComplete, deleteTodo } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();

	// create a handleCompleteClick function
	const handleCompleteClick = () => {
		// Pass in the new completed object to the action
		dispatch(toggleComplete({
			id: id,
			completed: !completed,
		}));
	}

	// Dispatch deleteTodo action to delete a todo when  delete button is clicked
	const handleDeleteClick = () => {
		dispatch(deleteTodo({id: id}));
	}

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input 
						type='checkbox' 
						className='mr-3' 
						checked={completed}
						onChange={handleCompleteClick}
					></input>
					{title}
				</span>
				<button 
					className='btn btn-danger'
					onClick={handleDeleteClick}
				>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
