import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3003'

let token = null
let config = null

const setToken = userToken => {
  token = userToken
  config = {
    headers: { authorization: `Bearer ${token}` }
  }
}


const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/blogs`)
  return response.data
}

const createBlog = async (newBlog) => {
  const response = await axios
    .post(`${baseUrl}/api/blogs`, newBlog, config)
  return response.data
}

const updateBlog = async (updatedBlog) => {
  const response = await axios
    .put(`${baseUrl}/api/blogs/${updatedBlog.id}`,
      updatedBlog,
      config)

  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios
    .delete(`${baseUrl}/api/blogs/${id}`,
      config)

  return response.data
}
export default {
  setToken,
  getAll,
  createBlog,
  updateBlog,
  deleteBlog
}
