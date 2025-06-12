import {render} from 'preact';
import {useState, useEffect} from 'preact/hooks';

function App() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const API_TODOS = "/api/todos";

    useEffect(() => {
        fetch(API_TODOS)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Response was not ok: ${res.status} - ${res.statusText}`);
                }
                return res.json();
            })
            .then(setTodos)
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    const addTodo = () => {
        fetch(API_TODOS, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({task}),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Response was not ok: ${res.status} - ${res.statusText}`);
                }
                return res.json();
            })
            .then(newTodo => {
                setTodos([...todos, newTodo]);
                setTask('');
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                value={task}
                onInput={(e) => setTask(e.target.value)}
                placeholder="Nouvelle tâche"
            />
            <button onClick={addTodo}>Ajouter</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>
        </div>
    );
}

render(<App/>, document.getElementById('app'));
