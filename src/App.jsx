import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    
    //using localStorage for testing purposes. later use chrome.storage
    const saved = localStorage.getItem('notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, [])

  const addNote = () => {
    if (input.trim() !== ''){
      const newNote = {
        id: Date.now(),
        text: input.trim()
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);

      //using localStorage for testing purposes. later use chrome.storage
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  }

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  return (
    <>
      <div>
        <h1>Chrome Notes</h1>
        <p>Note it down....without switching tabs!</p>
        <div className='p-4 flex'>
          <input 
              className='outline p-4'
              type="text"
              placeholder='Your note'
              value={input}
              onChange={(e) => setInput(e.target.value)}
          />
          <button className='ml-4' onClick={addNote}>Add Note</button>
        </div>
        <div>
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <span>{note.text}</span>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        
      </div>
    </>
  )
}

export default App
