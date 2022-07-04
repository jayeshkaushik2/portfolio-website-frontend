import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import NotifyDataMsg from '../Notifications/NotifyDataMsg';

export const AdminSkills = () => {
  const [SkillData, setSkillData] = useState("")
  const [Skill, setSkill] = useState("")

  useEffect(() => {
    getSkillData()
  }, [])

  let getSkillData = async () => {
    let response = await fetch('/api/get-skill/')
    let data = await response.json()
    setSkillData(data["results"])
  }

  let {AuthTokens} = useContext(AuthContext)

  let postSkillData = async (data) => {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+String(AuthTokens.access) },
      body: JSON.stringify(data)
    };
    let response = await fetch('/api/get-skill/', requestOptions);
    let response_data = await response.json();
    getSkillData()
  }

  const handleDeleteSkill = async (id) => {
    let flag = NotifyDataMsg("Delete")
    if (flag === true) {
      let response = await fetch(`/api/get-skill/${id}/`, { method: 'DELETE' })
      if (response.status === 204){
        getSkillData()
      }
      else {
        alert('not found')
      }
    }
  }


  const submitSkillData = (e) => {
    e.preventDefault()
    if (Skill === "") {
      alert("Please fill up the field")
    }
    else {
      let data = {
        skill_name: Skill
      }
      postSkillData(data)
    }
  }

  const DeleteSkillData = (e) => {
    // let temp = e.target.value
    alert("delete data?", e.target.getAttribute("index"))
    // deleteSkillData()
  }

  return (
    <div className="container">
      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Skill</span>
        <input type="text" className="form-control" placeholder="Skill" aria-label="Skill" aria-describedby="addon-wrapping" onChange={(e) => setSkill(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary" onClick={submitSkillData}>Submit</button>
      <br />

      <div className="container" style={{ backgroundColor: "#dbedff", marginTop: "10px", borderRadius: "5px", padding: 0 }}>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S no.</th>
              <th scope="col" style={{ textAlign: "center" }}>Skill</th>
              <th scope="col" style={{ textAlign: "center" }}>Delete</th>
            </tr>
          </thead>
          {SkillData ? SkillData.map((key, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td style={{ textAlign: "center" }}>{SkillData[index]["skill_name"]}</td>
                <td style={{ textAlign: "center" }}>
                  <button className="btn" index={SkillData[index]["id"]} onClick={(e) => {handleDeleteSkill(SkillData[index]["id"])}}>
                    {/* <input value={SkillData[index]["id"]} hidden id="skill_id" /> */}
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
