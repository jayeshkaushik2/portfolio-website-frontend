import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import NotifyDataMsg from '../Notifications/NotifyDataMsg';

export const AdminEducation = () => {
  const [EduData, setEduData] = useState(null)
  const [School, setSchool] = useState("")
  const [Course, setCourse] = useState("")
  const [Stream, setStream] = useState("")
  const [Start, setStart] = useState("")
  const [End, setEnd] = useState("")
  const [Marks, setMarks] = useState("")

  let { AuthTokens } = useContext(AuthContext)

  useEffect(() => {
    getEducationData()
  }, []);

  let getEducationData = async () => {
    let response = await fetch('/api/get-education/')
    let data = await response.json()
    setEduData(data["results"])
  }

  let postEducationData = async (data) => {
    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(AuthTokens.access)
      },
      body: JSON.stringify(data)
    };
    let response = await fetch('/api/get-education/', requestOptions);
    let response_data = await response.json();
    SetDataNull()
    getEducationData()
  }

  function SetDataNull() {
    setCourse("")
    setSchool("")
    setStream("")
    setStart("")
    setEnd("")
    setMarks("")
  }

  const submitEducationData = (e) => {
    e.preventDefault()
    let data = {
      school: School,
      course: Course,
      stream: Stream,
      start: Start,
      end: End,
      marks: Marks,
    }
    postEducationData(data)
  }

  const handleDeleteEdu = async (id) => {
    let flag = NotifyDataMsg("Delete")
    if (flag === true) {
      let response = await fetch(`/api/get-education/${id}/`, { method: 'DELETE' })
      if (response.status === 204){
        getEducationData()
      }
      else {
        alert('not found')
      }
    }
  }

  return (
    <div className="container">
      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">School</span>
        <input type="text" className="form-control" placeholder="School" aria-label="School" aria-describedby="addon-wrapping" onChange={(e) => setSchool(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Course</span>
        <input type="text" className="form-control" placeholder="Course" aria-label="Course" aria-describedby="addon-wrapping" onChange={(e) => setCourse(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Stream</span>
        <input type="text" className="form-control" placeholder="Stream" aria-label="Stream" aria-describedby="addon-wrapping" onChange={(e) => setStream(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Start</span>
        <input type="date" className="form-control" placeholder="Start" aria-label="Start" aria-describedby="addon-wrapping" onChange={(e) => setStart(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">End</span>
        <input type="date" className="form-control" placeholder="End" aria-label="End" aria-describedby="addon-wrapping" onChange={(e) => setEnd(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Marks</span>
        <input type="number" className="form-control" placeholder="Marks" aria-label="Marks" aria-describedby="addon-wrapping" onChange={(e) => setMarks(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary" onClick={submitEducationData}>Submit</button>
      <br />
      <div className="container" style={{ backgroundColor: "#dbedff", marginTop: "10px", borderRadius: "5px", padding: 0 }}>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S no.</th>
              <th scope="col">School</th>
              <th scope="col">Stream</th>
              <th scope="col">Course</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Marks</th>
              <th scope="col" style={{ textAlign: 'center' }}>Delete</th>
            </tr>
          </thead>
          {EduData ? EduData.map((key, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{EduData[index]["school"]}</td>
                <td>{EduData[index]["stream"]}</td>
                <td>{EduData[index]["course"]}</td>
                <td>{EduData[index]["start"]}</td>
                <td>{EduData[index]["end"]}</td>
                <td>{EduData[index]["marks"]}</td>
                <td style={{ textAlign: 'center' }}>
                  <button className="btn" id={EduData[index]["id"]} type="button" onClick={(e) => handleDeleteEdu(EduData[index]["id"])}>
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
