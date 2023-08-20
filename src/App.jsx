import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    
    //using localStorage for testing purposes. later use chrome.storage
    // const saved = localStorage.getItem('notes');
    // if (saved) {
    //   setNotes(JSON.parse(saved));
    // }
    chrome.storage.local.get('notes', (data) => {
      if (data.notes) {
        setNotes(data.notes);
      }
    });
  }, [])

  const addNote = () => {
    if (input.trim() !== ''){
      const newNote = {
        id: Date.now(),
        text: input.trim()
      };
      const updatedNotes = [...notes, newNote];

      //using localStorage for testing purposes. later use chrome.storage
      // localStorage.setItem('notes', JSON.stringify(updatedNotes));
      chrome.storage.local.set({ notes: updatedNotes }, () => {
        setNotes(updatedNotes);
        setInput('');
      });
    }
  }

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    

    // localStorage.setItem('notes', JSON.stringify(updatedNotes));
    chrome.storage.local.set({ notes: updatedNotes }, () => {
      setNotes(updatedNotes);
    });
  }

  return (
    <>
      <div className='bg-white rounded-2xl shadow-2xl p-10'>
        <h1 className='text-center'>Chrome Notes</h1>
        <p className='text-center'>Note it down....without switching tabs!</p>
        <div className='p-4 flex'>
          <input 
              className=' p-4 bg-white rounded-2xl shadow-lg'
              type="text"
              placeholder='Your note'
              value={input}
              onChange={(e) => setInput(e.target.value)}
          />
          <button className='ml-4 bg-teal-400 text-white rounded-2xl shadow-lg p-4' onClick={addNote}>Add Note</button>
        </div>
        <div className='ml-4 flex flex-col space-between'>
          <ul>
            {notes.map(note => (
              <div className='m-2 bg-gray-900 rounded-lg text-gray-400'>
              <li key={note.id}>
                  <span className=' rounded-s-lg'>{note.text}</span>
                  <button className='flex justify-end bg-teal-400 text-white p-1 rounded-e-lg' onClick={() => deleteNote(note.id)}>Delete</button>
                </li>
              </div>

            ))}
          </ul>
        </div>

        
      </div>
    </>
  )
}

export default App
