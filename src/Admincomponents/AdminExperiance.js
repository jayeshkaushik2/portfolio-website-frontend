import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import NotifyDataMsg from '../Notifications/NotifyDataMsg';

export const AdminExperiance = () => {
  const [Experience, setExperience] = useState(null)
  const [Company, setCompany] = useState("")
  const [Position, setPosition] = useState("")
  const [Type, setType] = useState("")
  const [Start, setStart] = useState("")
  const [End, setEnd] = useState("")
  const [IsActive, setIsActive] = useState(false)

  useEffect(() => {
    getExperienceDate()
  }, [])


  let getExperienceDate = async () => {
    let response = await fetch('/api/get-experience/')
    let data = await response.json()
    setExperience(data["results"])
  }
  
  let {AuthTokens} = useContext(AuthContext)

  let postExperienceDate = async (data) => {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+String(AuthTokens.access) },
      body: JSON.stringify(data)
    };
    let response = await fetch('/api/get-experience/', requestOptions);
    let response_data = await response.json();
    getExperienceDate()
  }

  const submitExperienceDate = (e) => {
    e.preventDefault()
    if (Company === "" || Position === "" || Type === "") {
      alert("Please fill up all fields.")
    }
    else {
      let data = {
        company: Company,
        position: Position,
        type: Type,
        start: Start,
        end: End,
        is_active: IsActive
      }
      postExperienceDate(data)
    }
  }

  function checkActive() {
    if (IsActive === false) {
      setIsActive(true)
      document.getElementById("end_date").style.display = "none"
    }
    else {
      document.getElementById("end_date").style.display = "flex"
      setIsActive(false)
    }
  }

  function DetailedView() {
    console.log("details viewed")
  }

  const handleDeleteExp = async (id) => {
    let flag = NotifyDataMsg("Delete")
    if (flag === true) {
      let response = await fetch(`/api/get-experience/${id}/`, { method: 'DELETE' })
      if (response.status === 204){
        getExperienceDate()
      }
      else {
        alert('not found')
      }
    }
  }

  return (
    <div className="container">
      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Company</span>
        <input type="text" className="form-control" placeholder="Company" aria-label="Company" aria-describedby="addon-wrapping" onChange={(e) => setCompany(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Position</span>
        <input type="text" className="form-control" placeholder="Position" aria-label="Position" aria-describedby="addon-wrapping" onChange={(e) => setPosition(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Type</span>
        <input type="text" className="form-control" placeholder="Type" aria-label="Type" aria-describedby="addon-wrapping" onChange={(e) => setType(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Start</span>
        <input type="date" className="form-control" placeholder="Start" aria-label="Start" aria-describedby="addon-wrapping" onChange={(e) => setStart(e.target.value)} />
      </div>

      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={IsActive} onChange={checkActive} />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Present
        </label>
      </div>

      <div className="input-group flex-nowrap my-2" id="end_date">
        <span className="input-group-text" id="addon-wrapping">End</span>
        <input type="date" className="form-control" placeholder="End" aria-label="End" aria-describedby="addon-wrapping" onChange={(e) => setEnd(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary" onClick={submitExperienceDate}>Submit</button>
      <br />

      <div className="container" style={{ backgroundColor: "#dbedff", marginTop: "10px", borderRadius: "5px", padding: 0 }}>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S no.</th>
              <th scope="col">Company</th>
              <th scope="col">Position</th>
              <th scope="col">Type</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Present</th>
              <th scope="col" style={{textAlign:'center'}}>Delete</th>
            </tr>
          </thead>
          {Experience ? Experience.map((key, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td onClick={DetailedView}>
                  <a link="#">
                    {Experience[index]["company"]}
                  </a>
                </td>
                <td>{Experience[index]["position"]}</td>
                <td>{Experience[index]["type"]}</td>
                <td>{Experience[index]["start"]}</td>
                <td>{Experience[index]["end"]}</td>
                <td>{Experience[index]["is_active"] ? "Present" : ""}</td>
                <td style={{textAlign:'center'}}>
                  <button className="btn" type="button" onClick={(e) => {handleDeleteExp(Experience[index]["id"])}}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          ))
            : ""}
        </table>
      </div>
    </div>

  )
}
