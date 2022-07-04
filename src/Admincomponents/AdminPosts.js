import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import NotifyDataMsg from '../Notifications/NotifyDataMsg';

export const AdminPosts = () => {
  const [PostData, setPostData] = useState(null)
  const [Post_Image, setPost_Image] = useState("")
  const [Post_Title, setPost_Title] = useState("")
  const [Post_Description, setPost_Description] = useState("")

  useEffect(() => {
    getPostData()
  }, [])

  let getPostData = async () => {
    let response = await fetch('/api/get-posts/')
    let data = await response.json()
    setPostData(data["results"])
  }

  let {AuthTokens} = useContext(AuthContext)

  let postPostData = async (data) => {
    // e.preventDefault()
    let requestOptions = {
      method: 'POST',
      headers: { 'Authorization': 'Bearer '+String(AuthTokens.access) },
      body: data
    };
    let response = await fetch('/api/get-posts/', requestOptions);
    let response_data = await response.json();
    getPostData()
  }

  const submitPostData = (e) => {
    e.preventDefault()
    if (Post_Title === ""){
      alert("Please fill up required fields.")
    }
    else {
      const dataa = new FormData();
      dataa.append('post_title', Post_Title)
      dataa.append('post_description', Post_Description)
      dataa.append('post_image', Post_Image, Post_Image.name)
      postPostData(dataa)
    }
  }

  const handleDeletePost = async (id) => {
    let flag = NotifyDataMsg("Delete")
    if (flag === true) {
      let response = await fetch(`/api/get-project/${id}/`, { method: 'DELETE' })
      if (response.status === 204){
        getPostData()
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
        <input type="text" className="form-control" placeholder="Title" aria-label="Post_Title" aria-describedby="addon-wrapping" onChange={(e) => setPost_Title(e.target.value)} />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">Description</span>
        <textarea type="text" className="form-control" placeholder="Description" aria-label="Post_Description" aria-describedby="addon-wrapping" onChange={(e) => setPost_Description(e.target.value)}></textarea>
      </div>

      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupFile01">Upload Image</label>
        <input type="file" className="form-control" id="inputGroupFile01" onChange={(e) => setPost_Image(e.target.files[0])} />
      </div>

      <button type="submit" className="btn btn-primary" onClick={submitPostData}>Submit</button>
      <br />

      <div className="container" style={{ backgroundColor: "#dbedff", marginTop: "10px", borderRadius: "5px", padding: 0 }}>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S no.</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Posted on</th>
              <th scope="col" style={{textAlign:'center'}}>Delete</th>
            </tr>
          </thead>
          {PostData ? PostData.map((key, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="containerr" style={{ backgroundImage: `url(${PostData[index]["post_image"]})`, backgroundSize: "cover", width: "50px", height: "50px", borderRadius: "50%" }}></div>
                </td>
                <td>{PostData[index]["post_title"]}</td>
                <td>{PostData[index]["post_description"].length > 35 ?
                  PostData[index]["post_description"].slice(0, 35) + "..." :
                  PostData[index]["post_description"]
                }</td>
                <td>{PostData[index]["post_date"]}</td>
                <td style={{textAlign:'center'}}>
                  <button className="btn" type="button" onClick={(e) => {handleDeletePost(PostData[index]["id"])}}>
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
