import React, { useState, useEffect } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);


    // Получение списка дел при первой загрузке
    useEffect(() => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/marina_master`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setTodos(data.map(todo => ({ ...todo, label: todo.label })));
            })
            .catch(error => console.error("ERROR: ", error));
    }, []);

    // Добавление нового дела
    const addTodo = (label) => {
        const newTodos = [...todos, { label, done: false }];
        updateTodos(newTodos);
    };

    // Обновление списка дел
    const updateTodos = (newTodos) => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/marina_master`, {
            method: "PUT",
            body: JSON.stringify(newTodos),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(() => {
                setTodos(newTodos);
            })
            .catch(error => console.error("ERROR: ", error));
    };

    // Удаление дела
    const deleteTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        updateTodos(newTodos);
    };

    return (
        <div className="container">

            <h1>TODO-LIST</h1>
            <form
                onSubmit={(e) => {
                e.preventDefault();
                addTodo(e.target.elements.todo.value);
                e.target.reset();
            }}>
                <input
                    type="text"
                    name="todo"
                className="input"
                placeholder="My todos"/>
                <button
                    type="submit"
                    className="SubmitBtn"
                    >ADD</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.label}
                        <button
                            onClick={() => deleteTodo(todo.id)}
                        className = "deleteBtn">X</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default TodoList;