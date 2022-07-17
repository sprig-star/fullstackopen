import { useState, useEffect } from 'react'
import contactService from './services/contactService'

const Notification = ({message, closeNotification}) => {
  const notification = {
    backgroundColor: 'pink',
    padding: 20
  }
  const close = {
    display: 'block',
    fontSize: 12
  }
  if (message) return (
    <aside style={notification}>
      {message}
      <a style={close} onClick={closeNotification} href=''>Dismiss notification</a>
    </aside>
  )
}

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

const Person = ({person, deleteClick}) =>
  <li>{person.name}, {person.number} <button onClick={() => deleteClick(person)}>delete</button> </li>

const PhoneList = ({persons, deleteClick}) =>
  <>
    <h2>Numbers</h2>
    <ul>
      {persons.map(person => <Person key={person.name} person={person} deleteClick={deleteClick} />)}
    </ul>
  </>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
      .then(responseData => setPersons(responseData))
      .then(setNotification('Contacts loaded from server'))
  }, [])
  console.log('rendered', persons.length, 'people')

  const closeNotification = event => {
    event.preventDefault()
    setNotification(null)
  }

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
    const nameIndex = persons.findIndex(entry => entry.name === newName)
    if (nameIndex > -1){
      const existingPerson = persons[nameIndex]
      if (existingPerson.number === newNumber) {
        window.alert(`${newName}'s number is already ${newNumber}`)
      } else if (window.confirm(`Update ${newName}'s number to ${newNumber}?`)) {
        contactService
          .update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(changedPerson => setPersons(persons.map((person, id) => id === nameIndex ? changedPerson : person)))
          .then(setNotification(`Updated ${newName}`))
          .catch(error => {
            setNotification(`Contact could not be updated, ${newName} was previously deleted`)
            setPersons(persons.filter((p, i) => i !== nameIndex))
          })
      }
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      contactService
        .create(newPerson)
        .then(responseData => setPersons(persons.concat(responseData)))
        .then(setNotification(`Added ${newName}`))
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)){
      const indexOfId = persons.indexOf(person)
      contactService
        .remove(person.id)
        .then(() => setPersons(persons.slice(0, indexOfId).concat(persons.slice(indexOfId+1))))
        .then(setNotification(`Deleted ${person.name}`))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} closeNotification={closeNotification} />
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
      <PhoneList persons={personsToShow} deleteClick={deletePerson} />
    </div>
  )
}

export default App