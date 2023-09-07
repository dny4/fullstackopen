import axios from "axios";

const baseUrl = "/api/contacts"

const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveContact = (contact) => {
  const request = axios.post(baseUrl, contact)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updateNumber = (contact) => {
  const request = axios.put(`${baseUrl}/${contact.id}`, contact)
  return request.then(response => response.data)
}

export default {
  getAllContacts,
  saveContact,
  deleteContact,
  updateNumber
}
