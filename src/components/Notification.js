import React from 'react'

const Notification = ({message, isSuccess}) =>
{

  var color = 'green'

  if (message === null)
  {
    return (
      <div className="error" style={{color: 'white'}}>
        {'\n'}
      </div>
    )
  }

  if (!isSuccess)
  {
    color = 'red'
  } else if (isSuccess)
  {
    color = 'green'
  }

  return (
    <div className="error" style={{color: color}}>
      {message}
    </div>
  )
}

export default Notification