import 'bulma/css/bulma.min.css';
import { useState, useRef } from 'react';

function TodoList({todos}) {
    return (
        todos.map((todo) => {
            return (
                <tr>
                    <td>
                        <input type='checkbox'></input>
                        {/* <button className='button is-small is-danger'>Complete</button> */}
                    </td>
                    <td key={todo.item}>{todo.item}</td>
                </tr>
            )
        })
    )
};

function AddTodo() {
    const [todos, setTodos] = useState([])
    const todoRef = useRef()

    function addingRef() {
        const newTodo = todoRef.current.value
        if (newTodo === '') return
        setTodos( currTodos => {
            return [ ...currTodos, {item: newTodo, complete: false}]
        })
        todoRef.current.value = null
    }

    return (
        <div className='tile is-ancestor'>
            <div className='tile is-vertical'>
                <div className="tile field has-addons">
                    {/* <label class="label">Label</label> */}
                    <div className="control has-icons-left">
                        <input ref={todoRef} className="input is-danger is-light" type="text" placeholder="Add task to your todo list"></input>
                        <span className="icon is-small is-left">
                            <i className="fa-solid fa-plus"></i>
                        </span>
                    </div>
                    <div className="control">
                        <button className="button is-danger is-light" onClick={addingRef}>
                            Save
                        </button>
                    </div> 
                </div>
                <div className='tile'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th><abbr title='Item'>Item</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            <TodoList todos={todos}></TodoList>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default function Todos() {
    return (
        <div className="container">
            <AddTodo></AddTodo>
        </div>
    )
}
