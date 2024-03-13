const SignUpForm = ({
  handleSignUp,
  name,
  setName,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <form onSubmit={handleSignUp}>
      <h2>new user🙏, please enter you details</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td>
              name
            </td>
            <td>
              <input
                type="text"
                id='name'
                value={name}
                name="name"
                onChange={({ target }) => setName(target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              username
            </td>
            <td>
              <input
                type="text"
                id='username'
                value={username}
                name="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              password
            </td>
            <td>
              <input
                value={password}
                id='password'
                type="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button id="login-button" type="submit">Sign Up</button>
    </form >
  )
}

export default SignUpForm
