import { useState } from 'react'

const BlogList = ({ blogs,
  handleBlogUpdate,
  handleBlogRemove }) => {

  const [viewId, setViewId] = useState('')

  const handleLike = async (b) => {
    const updatedBlog = {
      ...b,
      likes: b.likes + 1,
      user: b.user.id
    }
    await handleBlogUpdate(updatedBlog)
  }

  const handleRemove = async (b) => {
    const choice = window.confirm(
      `Do you want to remove '${b.title}' by '${b.author}'`)
    if (choice) { await handleBlogRemove(b.id) }
  }

  const handleView = ({ target }) => {
    target.innerText === 'hide'
      ? setViewId('')
      : setViewId(target.id)
  }

  const details = (b) => {
    return (
      <div id={b.id}>
        <p>auhtor - {b.author}</p>
        <p>
          likes - {b.likes} {}
          <button id={b.id}
            onClick={() => handleLike(b)}>like</button>
        </p>
        <a href={b.url}>link</a>
        <hr />
        <p>added by: {b.user.username}</p>
        <button onClick={() => handleRemove(b)}>remove</button>
      </div >
    )
  }

  return (
    <div>
      <h2>blog list</h2>
      {
        blogs.map((b) => {
          return (
            <div key={b.id} className='blog'>
              <h3>
                {b.title} {}
                <button
                  id={b.id}
                  onClick={handleView}>{
                    viewId === b.id ? 'hide' : 'view'
                  }
                </button>
              </h3>
              {b.id === viewId
                ? details(b)
                : <div></div>}
            </div>
          )
        })
      }
    </div>
  )
}

export default BlogList
