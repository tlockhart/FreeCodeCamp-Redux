import React from 'react';
import {useSelector} from 'react-redux';

const TotalCompleteItems = () => {
	// Pass a function to tell redux what specific data we want to extract from the total state tree
	const completedTodos = useSelector((state) => state.todos.filter(
		// give us all the todos that have a value of true
		(todo) => todo.completed === true)
	);
	return <h4 className='mt-3'>Total Complete Items: {completedTodos.length}</h4>;
};

export default TotalCompleteItems;
