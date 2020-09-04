import React from 'react';
import './App.css';
import NoteProvider from './components/NoteProvider';

function App() {
  return (
    <div className="App">
      <NoteProvider className="noteProvider">
      </NoteProvider>
    </div>
  );
}

export default App;
