import { useState } from 'react'
import {Filter, PersonForm, Persons} from './components/Components'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-34-234345', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4},
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewPhoneNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let sameNameDetected = false;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        sameNameDetected = true;
        alert(`${newName} is already added to phonebook`);
      }
    }

    if (!sameNameDetected) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewPhoneNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewPhoneNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App
