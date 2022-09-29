import React from 'react'

export default Error = (props) => {
  return (
      <div class="ui active dimmer">
        <div class="ui text loader">
          <div>{props.message}</div>
        </div>
      </div>    
  )
}
