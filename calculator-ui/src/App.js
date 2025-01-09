import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = async (e) => {
    e.preventDefault();

    // Check if both num1 and num2 are valid numbers
    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/calculate', {
        num1: num1.toString(),
        num2: num2.toString(),
        operation,
      });

      if (response.data && response.data.result !== undefined) {
        setResult(response.data.result);
        setError('');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      setError('Error occurred while calculating');
      setResult(null);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Modern Calculator</h1>
        <p style={styles.subheader}>
          Combining cutting-edge technologies like Elixir, React, and Rust.
        </p>
      </header>
      
      <form onSubmit={calculate} style={styles.form}>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter Number 1"
          required
          style={styles.input}
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.select}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter Number 2"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Calculate
        </button>
      </form>

      {result !== null && <h2 style={styles.result}>Result: {result}</h2>}
      {error && <p style={styles.error}>{error}</p>}

      <footer style={styles.footer}>
        <p>
          Built with <strong>Elixir</strong>, <strong>React</strong>, and <strong>Rust</strong>.
        </p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f4f7f6',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '20px',
    borderRadius: '5px',
  },
  subheader: {
    fontSize: '1.2em',
    marginTop: '10px',
  },
  form: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '1.2em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100px',
  },
  select: {
    padding: '10px',
    fontSize: '1.2em',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2em',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0057b7',
  },
  result: {
    marginTop: '20px',
    fontSize: '1.5em',
    color: '#007b00',
  },
  error: {
    marginTop: '20px',
    color: 'red',
  },
  footer: {
    marginTop: '50px',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
  },
};

export default App;
