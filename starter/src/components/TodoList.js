import React, {useEffect} from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
// import getTodosAsync Thunk middleware
import { getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
	const dispatch = useDispatch();

	// go to the store pickout all the todos from state and assign it to the todos variable:
	const todos = useSelector((state) => state.todos);
	// const todos = [
	// 	{ id: 1, title: 'todo1', completed: false },
	// 	{ id: 2, title: 'todo2', completed: false },
	// 	{ id: 3, title: 'todo3', completed: true },
	// 	{ id: 4, title: 'todo4', completed: false },
	// ];

	useEffect(
		// When component loads, dispatch the getTodosAsync Thunk action, 
		// which fetches the to does and adds them to state.  After the state is updated
		// the todos useSelecter is updated, causing the component to rerender
		() => {
			// dispatch the getTodosAsync action
			dispatch(getTodosAsync())
		}, [dispatch]);

	return (
		<ul className='list-group'>
			{todos.map((todo) => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
