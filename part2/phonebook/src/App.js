import { useState } from 'react'

const Person = ({person}) =>
  <li>{person.name}, {person.number}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const personsToShow = persons.filter( person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort( person =>
    !(person.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
  )

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
      <h3>search</h3>
      <form>
        filter name:
        <input type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)} 
        />
      </form>
      <h3>add a person</h3>
      <form>
        name:
          <input type="text" 
            value={newName} 
            onChange={(event) => setNewName(event.target.value)}
          />
        number:
          <input type="tel" 
            value={newNumber} 
            onChange={(event) => setNewNumber(event.target.value)}
          />
        <button type="submit" onClick={addPerson}>add</button>
      </form>
      <h2>Numbers</h2>
        <ul>
          {personsToShow.map(person => <Person key={person.name} person={person} />)}
        </ul>
    </div>
  )
}

export default App