import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useState, useRef, useEffect } from 'react';
import { getTodoWithID } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/clerk-react";
import Link from 'next/link';


export default function OneTodo() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const todoRef = useRef();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function process() {
          if (userId) {
            const token = await getToken({ template: "codehooks" });

            setTodo(await getTodoWithID(userId, id, token));
            setLoading(false);
          }
        }
        process();
    }, [isLoaded, todo]);

    function TodoList(list) {
        const completeTodo = (todo) => {
            todo.complete = true;
            setTodo(todo);
        }
    
        return (
            undoneTodos.map((todo, index) => {
            return (
              <tr key={index}>
                <td>{todo.category}</td>
                <td>{todo.createDate}</td>
                <td>{todo.complete.toString()}</td>
                <td>
                  <button className='button is-rounded is-small is-danger' onClick={() => completeTodo(todo)}>Complete</button>
                </td>
              </tr>
            )
          })
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
                        <p>Loading {id}</p>
                    </div>
                    <div className="column">
                        <button className="button is-danger is-light">
                            <Link href="/todos" className='is-link'>
                              Go to your to-do list
                            </Link>
                        </button>
                        <br></br>
                        <SignOutButton></SignOutButton>
                    </div>
                </div>
            </div>
        )
    } else{
        return (
            <div className="container">
                <div className='columns is-ancestor'>
                    <div className='column is-three-fifths'>
                        <label className="label">{id}</label>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Created date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TodoList list={todo}></TodoList>                            
                            </tbody>
                        </table>
                    </div>    
                    <div className="column">
                        <button className="button is-danger is-light">
                            <Link href="/todos" className='is-link'>
                              Go to your to-do list
                            </Link>
                        </button>
                        <br></br>
                        <SignOutButton></SignOutButton>
                    </div>
                </div>
            </div>
        )   
    }
}
