import { useState } from 'react'

const Search = ({query, onChange}) =>
  <form>
    <h3>search</h3>
    filter by name:
    <input type="search"
      value={query}
      onChange={onChange} 
    />
  </form>

const PersonsForm = ({name, nameHandler, number, numberHandler, submitHandler}) =>
  <form>
    <h3>add a person</h3>
    name:
      <input type="text" 
        value={name} 
        onChange={nameHandler}
      />
    number:
      <input type="tel" 
        value={number} 
        onChange={numberHandler}
      />
    <button type="submit" onClick={submitHandler}>add</button>
  </form>

const Person = ({person}) =>
  <li>{person.name}, {person.number}</li>

const PhoneList = ({persons}) =>
  <>
    <h2>Numbers</h2>
    <ul>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </ul>
  </>

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
      <Search
        query={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)} 
      />
      <PersonsForm
        name={newName}
        nameHandler = {(event) => setNewName(event.target.value)}
        number={newNumber} 
        numberHandler = {(event) => setNewNumber(event.target.value)}
        submitHandler = {addPerson}
      />
      <PhoneList persons={personsToShow} />
    </div>
  )
}

export default App