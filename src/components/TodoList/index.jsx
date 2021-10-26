import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss'

TodoList.propTypes = {
    todos: PropTypes.array,
    onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todos: [],
    onTodoClick: null,
}


function TodoList(props) {
    const { todos, onTodoClick } = props;

    function handleCLick(todo) {
        if (onTodoClick) {
            onTodoClick(todo);
        }
    }
    return (
        <ul className="todo-list">
            {todos.map((todos) => (
                <li
                    onClick={() => handleCLick(todos)}
                    key={todos.id} >
                    {todos.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;