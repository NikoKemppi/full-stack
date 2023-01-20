import { useState } from 'react'

const Name = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567',   
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <Name key={person.name} person={person}/>)}
    </div>
  )
}

export default App
