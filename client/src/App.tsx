import { useEffect, useState } from 'react';
import AddTodo from './Components/AddTodo';
import axios from 'axios';

export const ENDPOINT = 'http://localhost:3000';
export interface Todo {
  id: number;
  title: string;
  done: boolean;
  body: string;
}
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await axios.get<Todo[]>(`${ENDPOINT}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  // async function fetchTodos() {
  //   try {
  //     const response = await fetch(`${ENDPOINT}/api/todos`, {
  //       method: 'GET',
  //     });
  //     const data = await response.json();
  //     setTodos(data);
  //   } catch (error) {
  //     console.error('Error fetching todos:', error);
  //   }
  // }

  // async function markTodoAsDone(id: number) {
  //   try {
  //     await fetch(`${ENDPOINT}/api/todos/${id}`, {
  //       method: 'PATCH',
  //     });

  //     setTodos((prevTodos) =>
  //       prevTodos.map((todo) =>
  //         todo.id === id ? { ...todo, done: !todo.done } : todo
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Error updating todo:', error);
  //   }
  // }
  async function markTodoAsDone(id: number) {
    try {
      await axios.patch(`${ENDPOINT}/api/todos/${id}`);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  return (
    <div>
      <h1>Welcome To TODO Application</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={`todo_list__${todo.id}`}
            onClick={() => markTodoAsDone(todo.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: todo.done ? '#e0ffe0' : '#fff',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                height: '24px',
                marginRight: '1rem',
                backgroundColor: todo.done ? 'teal' : 'gray',
                borderRadius: '50%',
              }}
            ></span>
            <span style={{ color: 'black' }}>{todo.title}</span>
          </li>
        ))}
      </ul>

      <AddTodo onAddTodo={fetchTodos} />
      <h1>HLoo</h1>
    </div>
  );
}

export default App;
