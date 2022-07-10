import { useState } from 'react'

const Person = ({person}) =>
  <li>{person.name}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(entry => entry.name === newName)){
      window.alert(`${newName} is already in the phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName}))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <Person key={person.name} person={person} />)}
        </ul>
    </div>
  )
}

export default App