import axios from "axios";

const baseUrl = "http://localhost:3001/contacts"

const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const saveContact = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(response => response.data)
}

export default {
    getAllContacts,
    saveContact,
    deleteContact,
    updateNumber
}
