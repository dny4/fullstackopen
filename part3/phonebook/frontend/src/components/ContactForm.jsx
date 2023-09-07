import { useState } from "react";
import phonebookService from "../services/phonebookService";

export function ContactForm({ contacts, setContacts, setFilteredContacts, notifyUser }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleName = e => setNewName(e.target.value);
  const handleNumber = e => setNewNumber(e.target.value);


  const handleform = event => {
    event.preventDefault();
    const contact = contacts.find(c => c.name === newName)

    if (contact) { // contact exists
      const confirmted = confirm(`'${newName}' already exists in phonebook, do you want to update number?`);
      if (confirmted) {
        // update contact on server 
        const newContact = { ...contact, number: newNumber }
        phonebookService
          .updateNumber(newContact)
          .then(result => {
            const updatedContacts = [...contacts.filter(c =>
              c.name != result.name),
              newContact]
            setContacts(updatedContacts)
            setFilteredContacts(updatedContacts)
            setNewName('')
            setNewNumber('')
            notifyUser(`'${newContact.name}'s' number updated!`, 0)
          })
      }
    } else { // save new contact
      const newContact = {
        name: newName,
        number: newNumber,
      };

      phonebookService
        .saveContact(newContact)
        .then(savedContact => {
          const updatedContacts = [...contacts, savedContact]
          setContacts(updatedContacts)
          setFilteredContacts(updatedContacts)
          setNewName('');
          setNewNumber('');
          notifyUser(`New contact '${savedContact.name}' saved!`, 0)
        })
        .catch(error => {
          notifyUser(`${error.response.data.error}`)
        });
    }
  };

  return (
    <form onSubmit={handleform}>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input onChange={handleName} value={newName} />
            </td>
          </tr>
          <tr>
            <td>Number</td>
            <td>
              <input onChange={handleNumber} value={newNumber} />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="sublit">add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
