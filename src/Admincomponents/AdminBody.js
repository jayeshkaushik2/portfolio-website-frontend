import React from 'react'
import backimage from '../assests/backimage.gif'

export const AdminBody = (props) => {
  return (
    <div>
      <h1 style={{ margin: "0px", padding: "0px", textAlign: "center", position: "absolute", color: "white", top: "50%", left: "50%", transform: "translate(-50%, -50%)", }}>Welcome!</h1>
      <img src={backimage} className="" alt="background-gif" style={{ width: "100%", height: "100vh" }} />
    </div>
  )
}
