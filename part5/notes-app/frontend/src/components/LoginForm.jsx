import PropTypes from 'prop-types'
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form
      className='m-2 rounded-md border-2 border-solid border-green-800 p-1'
      onSubmit={handleSubmit}>
      <div>
        username
        <input
          className='m-2 rounded-md border-2 border-solid border-green-800 p-1'
          id='username'
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          className='m-2 rounded-md border-2 border-solid border-green-800 p-1'
          id='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button
        className='m-2 rounded-md border-2 border-solid border-green-800 p-1'
        id='login-button' type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired

}

export default LoginForm
