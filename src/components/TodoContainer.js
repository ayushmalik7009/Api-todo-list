import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Bars } from "react-loader-spinner";

function TodoContainer({ addedTask }) {
	const [oldtodos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newTask, setNewTask] = useState(addedTask);
	// console.log(addedTask);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((response) => response.json())
			.then((json) => {
				setTimeout(() => {
					setTodos(json);
					setLoading(true);
				}, 1000);
				// console.log(json);
			});
	}, []);

	// Whenever the new task is added then that task
	useEffect(() => {
		let taskAddedByUser = addedTask.map((task, index) => {
			return <TodoItem tasks={task} key={index} />;
		});
		setNewTask(taskAddedByUser)
	},  [newTask])

	// console.log(todos);
	// let todoItemsHtml = ;
	// console.log(todoItemsHtml);
	return (
		<div className="todo-container">
			{newTask}
			{loading ? (
				oldtodos.map((task, index) => {
					return <TodoItem tasks={task} key={index} />;
				})
			) : (
				<Bars height="80" width="80" color="blue" ariaLabel="bars-loading" visible={true} />
			)}
		</div>
	);
}

export default TodoContainer;
