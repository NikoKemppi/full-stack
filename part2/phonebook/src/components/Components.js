const Filter = ({newFilter, handleFilterChange}) => {
    return (
      <form>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </form>
    )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Name = ({person}) => {
    return (
      <p>{person.name} {person.number}</p>
    )
}

const Persons = ({persons}) => {
    return (
        persons.map(person => <Name key={person.name} person={person}/>)
    )
}

export {Filter, PersonForm, Persons}