import { useState } from 'react'

const Person = ({person}) =>
  <li>{person.name}, {person.number}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '39-44-5323523'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (newName.length === 0 || newNumber.length === 0){
      window.alert(`Please complete the entry`)
    }
    else if (persons.some(entry => entry.name === newName)){
      window.alert(`${newName} is already in the phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        name: <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)}/>
        number: <input type="tel" value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        <button type="submit" onClick={addPerson}>add</button>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <Person key={person.name} person={person} />)}
        </ul>
    </div>
  )
}

export default App