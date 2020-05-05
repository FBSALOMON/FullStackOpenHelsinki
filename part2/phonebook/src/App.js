import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [personsFilter, setPersonsFilter] = useState([])

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                    setPersons(initialPersons)
                })
    }, [])

    useEffect(() => {
        setPersonsFilter(persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase())))
    },[filter,persons])

    const addContact = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        persons.some(person => person.name === personObject.name) ? updateContact(personObject)
            : personService
                .create(personObject)
                .then(returnPerson => {
                    setPersons(persons.concat(returnPerson))
                    setNewName('')
                    setNewNumber('')
                    setFilter('')
                    setMessage({
                        text: `Added ${returnPerson.name}`,
                        style: `messageSuccess`
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage({
                        text: `${error.response.data.error}`,
                        style: `messageError`
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
    }

    const updateContact = (personObject) => {
        const result = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
        const id = persons.filter(person => person.name === personObject.name)[0].id
        if (result) {
            personService
                .update(id, personObject)
                .then(returnPerson => {
                    setPersons(persons.map(person => person.id !== id ? person : returnPerson))
                    setNewName('')
                    setNewNumber('')
                    setFilter('')
                    setMessage({
                        text: `Number of ${returnPerson.name} has been updated`,
                        style: `messageSuccess`
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(() => {
                    setMessage({
                        text: `Information of ${personObject.name} has already been removed from server`,
                        style: `messageError`
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    const deleteContactById = (personObject) => {
        const result = window.confirm(`Do you want do delete ${personObject.name} from the list ?`)
        if (result) {
            personService
                .deleteObject(personObject.id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== personObject.id))
                    setNewName('')
                    setNewNumber('')
                    setFilter('')
                })
                .catch(() => {
                    setMessage({
                        text: `Information of ${personObject.name} has already been removed from server`,
                        style: `messageError`
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} />
            <Filter filter={filter} handleFilter={handleFilter} />
            <h3>Add a new</h3>
            <PersonForm newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addContact={addContact} />
            <h3>Numbers</h3>
            <Persons persons={personsFilter} deleteContactById={deleteContactById} />
        </div>
    )
}

export default App