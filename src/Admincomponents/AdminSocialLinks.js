import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';

export const AdminSocialLinks = () => {
    const [Email, setEmail] = useState("")
    const [Linkedin, setLinkedin] = useState("")
    const [Github, setGithub] = useState("")
    const [Coding, setCoding] = useState("")

    useEffect(() => {
        getSocailLinkDetails()
    }, []);

    let getSocailLinkDetails = async () => {
        let response = await fetch('/api/get-sociallinks/')
        let data = await response.json()
        setEmail(data["email"])
        setLinkedin(data["linkedin"])
        setGithub(data["github"])
        setCoding(data["coding"])
    }

    let {AuthTokens} = useContext(AuthContext)

    let postSocialLinkData = async (data) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+String(AuthTokens.access) },
            body: JSON.stringify(data)
        };
        let response = await fetch('/api/get-sociallinks/', requestOptions);
        let response_data = await response.json();
        setEmail(response_data["email"])
        setLinkedin(response_data["linkedin"])
        setGithub(response_data["github"])
        setCoding(response_data["coding"])
    }

    // let DeleteSocialLinksData = async (data) => {
    //     let response = fetch('/api/get-sociallinks/', { method: 'DELETE' })

    // }

    const submitSocialLinksData = (e) => {
        e.preventDefault()
        let data = {
            email: Email,
            linkedin: Linkedin,
            github: Github,
            coding: Coding
        }
        postSocialLinkData(data)
    }

    const handleDeleteSocialLinks = (e) => {
        e.preventDefault()
        let data = {
            email: "",
            linkedin: "",
            github: "",
            coding: ""
        }
        postSocialLinkData(data)
    }

    return (
        <div className="container">
            <div className="input-group my-3 mb-3">
                <span className="input-group-text" id="basic-addon2">Email</span>
                <input type="text" className="form-control" placeholder="Your Email" aria-label="Recipient's username" aria-describedby="basic-addon2" value={Email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">Linkedin URL</span>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={Linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">GitHub URL</span>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={Github} onChange={(e) => setGithub(e.target.value)} />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">Coding URL</span>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={Coding} onChange={(e) => setCoding(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary" onClick={submitSocialLinksData}>Submit</button>
            <button type="submit" className="btn btn-primary" style={{float: "right"}} onClick={handleDeleteSocialLinks}>Delete</button>

        </div>
    )
}
