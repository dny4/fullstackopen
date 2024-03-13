import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  if (visible) {
    return (
      <div>
        {props.children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    )
  }

  return (
    <button onClick={() => setVisible(true)}>
      {props.buttonLabel}
    </button>)
}
)

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
