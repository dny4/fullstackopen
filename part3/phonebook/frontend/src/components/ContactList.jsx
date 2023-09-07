import phonebookService from "../services/phonebookService"

export function ContactList({ contacts, setContacts, filteredContacts,
  setFilteredContacts, notifyUser }) {
  const removeContact = (e) => {
    const id = e.target.id
    const contact = filteredContacts.find(c => c.id === id)
    const confirmed = confirm(`Do you want to delete '${contact.name}' contact?`)
    if (confirmed) {
      // delete from server
      phonebookService
        .deleteContact(id)
        .then(() =>
          notifyUser(`${contact.name}'s contact deleted.`, 0)
        )
        .catch(error => notifyUser(`${error.message}`, 1))

      // update local domain
      const updatedPerson = contacts.filter(c => c.id !== id)
      setContacts(updatedPerson)
      setFilteredContacts(updatedPerson)
    }
  }

  return (
    <table>
      <tbody>
        {
          filteredContacts.map(c =>
            <tr key={c.id}>
              <td>
                {c.name}
              </td>
              <td>
                {c.number}
              </td>
              <td>
                <button id={c.id} onClick={removeContact}>delete</button>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>)
}

