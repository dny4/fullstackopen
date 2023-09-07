import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { ContactForm } from "./components/ContactForm";
import { ContactList } from "./components/ContactList";
import phonebookService from "./services/phonebookService";
import Notification from "./components/Notification";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [message, setMessage] = useState(null)

  const notifyUser = (notificationContent, isError) => {
    setMessage({
      content: notificationContent,
      isError: isError
    })
    setTimeout(() => setMessage(null), 3000);
  }


  useEffect(() => {
    phonebookService
      .getAllContacts()
      .then(allContacts => {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      })
      .catch(error => notifyUser(`${error.message}`, 1))
  }, [])

  return (
    <div>
      <Notification message={message} />

      <h2>Phonebook</h2>
      <Filter
        contacts={contacts}
        setFilteredContacts={setFilteredContacts} />

      <h2>Add new contact</h2>
      <ContactForm
        contacts={contacts}
        setContacts={setContacts}
        setFilteredContacts={setFilteredContacts}
        notifyUser={notifyUser}
      />

      <h2>Contacts</h2>
      <ContactList
        contacts={contacts}
        setContacts={setContacts}
        filteredContacts={filteredContacts}
        setFilteredContacts={setFilteredContacts}
        notifyUser={notifyUser}
      />
    </div>
  );
}

export default App;
