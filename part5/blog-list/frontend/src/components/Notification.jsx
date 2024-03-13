import PropTypes from 'prop-types'

const Notification = ({ message, isError }) => {
  if (!message) {
    return <div></div>
  }
  return (
    <div className={isError ? 'error' : 'info'}>
      {message
        ? <p>{message}</p>
        : <p>{}</p>
      }
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired
}
export default Notification

