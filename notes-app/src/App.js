import React from 'react';
import './App.css';
import NoteProvider from './components/NoteProvider';

function App() {
  const markdown = `
  # Header 1
  ## Header 2

  _ italic _

  ** bold **

  <b> bold Html </b>
  `;

  return (
    <div className="App">
      <NoteProvider className="noteProvider">
      </NoteProvider>
    </div>
  );
}

export default App;
