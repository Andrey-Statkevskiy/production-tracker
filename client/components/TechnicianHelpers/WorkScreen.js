import React from 'react'

const WorkScreen = ({ onFinish }) => {
  return (
    <div>
      <h2>Work in Progress</h2>

      <p>Here will be your instructions...</p>

      <button onClick={onFinish}>Finish</button>
    </div>
  )
}

export default WorkScreen