import { useState } from 'react';
import { ENDPOINT } from '../App';
import axios from 'axios';

interface AddTodoProps {
  onAddTodo: () => void;
}
function AddTodo({ onAddTodo }: AddTodoProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addTodo = async () => {
    try {
      await axios.post(`${ENDPOINT}/api/todos`, {
        title,
        body,
        done: false,
      });

      setTitle('');
      setBody('');
      onAddTodo(); // re-fetch the todos after adding a new one
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // const addTodo = async () => {
  //   await fetch(`${ENDPOINT}/api/todos`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ title, body, done: false }),
  //   });

  //   setTitle('');
  //   setBody('');
  //   onAddTodo(); // re-fetch the todos after adding a new one
  // };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          width: '100%',
          padding: '0.5rem',
        }}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          width: '100%',
          padding: '0.5rem',
        }}
      />
      <button onClick={addTodo} style={{ padding: '0.5rem 1rem' }}>
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
