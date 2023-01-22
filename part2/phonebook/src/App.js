import { useState } from 'react'

const Name = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      filter shown with <input value={newFilter} onChange={handleFilterChange}/>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-34-234345', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4},
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let sameNameDetected = false;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name == newName) {
        sameNameDetected = true;
        alert(`${newName} is already added to phonebook`);
      }
    }
    if (!sameNameDetected) {
      const personObject = {
        name: newName,
        number: newPhoneNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhoneNumber('')
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
      <Filter key={newFilter} newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Name key={person.name} person={person}/>)}
    </div>
  )
}

export default App
