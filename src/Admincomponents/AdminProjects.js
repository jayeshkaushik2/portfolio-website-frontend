import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import NotifyDataMsg from '../Notifications/NotifyDataMsg';

export const AdminProjects = () => {
  const [ProjectData, setProjectData] = useState(null)
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Link, setLink] = useState("")
  const [Start, setStart] = useState("")
  const [End, setEnd] = useState("")
  const [IsActive, setIsActive] = useState(false)

  useEffect(() => {
    getProjectData()
  }, [])

  let getProjectData = async () => {
    let response = await fetch('/api/get-project/')
    let data = await response.json()
    setProjectData(data["results"])
  }

  let {AuthTokens} = useContext(AuthContext)

  let postProjectData = async (data) => {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+String(AuthTokens.access) },
      body: JSON.stringify(data)
    };
    let response = await fetch('/api/get-project/', requestOptions);
    let response_data = await response.json();
    getProjectData()
  }

  const submitProjectData = (e) => {
    e.preventDefault()
    if (Title === "" || Start === "") {
      alert("Please fill up all fields.")
    }
    else {
      let data = {
        title: Title,
        description: Description,
        link: Link,
        start: Start,
        end: End,
        is_active: IsActive
      }
      postProjectData(data)
    }
  }


  function checkActive() {
    if (IsActive === false) {
      setIsActive(true)
      document.getElementById("end_date_project").style.display = "none"
    }
    else {
      document.getElementById("end_date_project").style.display = "flex"
      setIsActive(false)
    }
  }

  const handleDeleteProject = async (id) => {
    let flag = NotifyDataMsg("Delete")
    if (flag === true) {
      let response = await fetch(`/api/get-project/${id}/`, { method: 'DELETE' })
      if (response.status === 204){
        getProjectData()
      }
      else {
        alert('not found')
      }
    }
  }

  return (
    <div className="container">
      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Title</span>
        <input type="text" className="form-control" placeholder="Title" aria-label="Title" aria-describedby="addon-wrapping" onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Description</span>
        <textarea type="text" className="form-control" placeholder="Description" aria-label="Description" aria-describedby="addon-wrapping" onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Link</span>
        <input type="text" className="form-control" placeholder="Link" aria-label="Link" aria-describedby="addon-wrapping" onChange={(e) => setLink(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Start</span>
        <input type="date" className="form-control" placeholder="Start" aria-label="Start" aria-describedby="addon-wrapping" onChange={(e) => setStart(e.target.value)} />
      </div>

      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={IsActive} onChange={checkActive} />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Present
        </label>
      </div>

      <div className="input-group flex-nowrap my-2" id="end_date_project">
        <span className="input-group-text" id="addon-wrapping">End</span>
        <input type="date" className="form-control" placeholder="End" aria-label="End" aria-describedby="addon-wrapping" onChange={(e) => setEnd(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary" onClick={submitProjectData}>Submit</button>
      <br />

      <div className="container" style={{ backgroundColor: "#dbedff", marginTop: "10px", borderRadius: "5px", padding: 0 }}>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S no.</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Is Active</th>
              <th scope="col" style={{textAlign:'center'}}>Delete</th>
            </tr>
          </thead>
          {ProjectData ? ProjectData.map((key, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <a className="link" href={ProjectData[index]["link"]}>
                    {ProjectData[index]["title"]}
                  </a>
                </td>
                <td>{ProjectData[index]["description"].length > 35 ?
                  ProjectData[index]["description"].slice(0, 35) + "..." :
                  ProjectData[index]["description"]
                }</td>
                <td>{ProjectData[index]["start"]}</td>
                <td>{ProjectData[index]["end"]}</td>
                <td>{ProjectData[index]["is_active"] ? "On going" : ""}</td>
                <td style={{textAlign:'center'}}>
                  <button className="btn" type="button" onClick={(e) => {handleDeleteProject(ProjectData[index]["id"])}}>
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
