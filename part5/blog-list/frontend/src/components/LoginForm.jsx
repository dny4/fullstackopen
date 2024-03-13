import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <hr />
      <table>
        <tbody>
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
      <button id="login-button" type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm
