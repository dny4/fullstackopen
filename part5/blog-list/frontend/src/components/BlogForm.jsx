import { useState } from 'react'

const BlogForm = ({
  addBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <hr />
      <table>
        <tr>
          <td>
            title
          </td>
          <td>
            <input
              type="text"
              name="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            author
          </td>
          <td>
            <input
              type="text"
              name="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            url
          </td>
          <td>
            <input
              type="text"
              name="Url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </td>
        </tr>
      </table>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
