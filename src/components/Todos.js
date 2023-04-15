import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState, useRef, useEffect } from 'react';
import { getUndoneTodos, addNewTodo } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/clerk-react";


export default function Todos() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [undoneTodos, setUndoneTodos] = useState([]);
    const [newTodo, setNewTodo] = useState([]);
    // const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const todoRef = useRef();

    useEffect(() => {
        async function process() {
          if (userId) {
            const token = await getToken({ template: "codehooks" });

            setUndoneTodos(await getUndoneTodos(userId, token));
            setLoading(false);
          }
        }
        process();
    }, [isLoaded, undoneTodos]);

    async function AddTodo() {
        const token = await getToken({ template: "codehooks" });
        const newItem = todoRef.current.value;
        todoRef.current.value = null;
        setNewTodo(await addNewTodo(userId, newItem, token));
    };

    function TodoList(list) {
        const completeTodo = (todo) => {
            todo.complete = true;
            setTodo(todo);
        }
    
        return (
            undoneTodos.map((todo, index) => {
            return (
              <tr key={index}>
                <td>{todo.item}</td>
                <td>{todo.category}</td>
                <td>{todo.createDate}</td>
                {/* <td>{todo.complete.toString()}</td> */}
                <td>
                  <button className='button is-rounded is-small is-danger' onClick={() => completeTodo(todo)}>Complete</button>
                </td>
              </tr>
            )
          })
        )
    };

    function AddingPart(){
        return (
            <div className='column is-ancestor'>
                <div className="column field has-addons">
                    <div className="control has-icons-left">
                        <input ref={todoRef} className="input is-danger is-light" type="text" placeholder="Add task"></input>
                        {/* <input value={newTodo}  onChange={(e) => setNewTodo(e.target.value)} className="input is-danger is-light" type="text" placeholder="Add task to your todo list"></input> */}
                        <span className="icon is-small is-left">
                            <i className="fa-solid fa-plus"></i>
                        </span>
                    </div>
                    <div className="control">
                        <button className="button is-danger is-light" onClick={AddTodo}>
                            Save
                        </button>
                    </div> 
                </div>
                <div className="column">
                    <SignOutButton></SignOutButton>
                </div>
            </div>
            
        )
    };

    const SignOutButton = () => {
        const { signOut } = useClerk();
        
        return (
          <button className="button is-danger is-small" onClick={() => signOut()} >
            Sign out
          </button>
        );
    };

      
    if (loading){
        return(
            <div className="container">
                <div className='columns is-ancestor'>
                    <div className='column is-three-fifths'>
                        <p>Loading</p>
                    </div>
                    <AddingPart></AddingPart>
                </div>
            </div>
        )
    } else{
        return (
            <div className="container">
                <div className='columns is-ancestor'>
                    <div className='column is-three-fifths'>
                        <label className="label">You have {undoneTodos.length} things to do</label>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Created date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TodoList list={undoneTodos}></TodoList>                            
                            </tbody>
                        </table>
                    </div>    
                    <AddingPart></AddingPart>
                </div>
            </div>
        )   
    }
}
