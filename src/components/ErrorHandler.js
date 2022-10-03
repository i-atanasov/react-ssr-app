import React from 'react'

const ErrorHandler = (props) => {
  return (
    <div class="ui active dimmer">
      <div class="ui text loader">
        <div>{props.message}</div>
      </div>
    </div>
  )
}

export default ErrorHandler;