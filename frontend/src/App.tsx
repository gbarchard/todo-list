import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useVersionQuery } from './generated/graphql';

function App() {
  const {data} = useVersionQuery()

  return (
    <div className="App bg-blue-50">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <br/>

        <p>{data?.version}</p>
      </header>
    </div>
  );
}

export default App;
