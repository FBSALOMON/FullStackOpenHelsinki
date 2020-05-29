import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = {
    color: notification.type === 'success' ? 'green' : 'red',
    backgroundColor: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderSize: 2,
    padding: 5,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

Notification.prototype = {
  notification : PropTypes.object.isRequired
}

export default Notification