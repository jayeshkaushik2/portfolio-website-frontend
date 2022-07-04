import React, { useState } from 'react'
import backimage from '../assests/backimage1.gif'
import defaultProfile from '../assests/defaultProfile.png'
import { Link } from 'react-router-dom'
import '../assests/ProfileHeader.css'

export default function ProfieHeader(props) {

    const [Profile, setProfile] = useState(false);

    function profileView() {
        let img = document.getElementById("profileImage")

        if (Profile) {
            setProfile(false)
            img.style.borderRadius = "50%"
            img.style.width = "240px"
            img.style.height = "240px"
        }
        else {
            setProfile(true)
            img.style.borderRadius = "0px"
            img.style.width = "100%"
            img.style.height = "auto"
        }
    }

    return (
        <>
            <div id="header">
                <Link className="btn btn-sm btn-secondary" id="signInBtn" to="/admin">Admin</Link>
                {/* <Link className="btn btn-sm btn-secondary" id="signInBtn" to="/admin">Admin?</Link> */}
                {/* <a className="btn btn-sm btn-primary" id="signInBtn" href="/">Sign in/owner</a> */}
                <img src={props.profileDetails["backprofile_image"] ? props.profileDetails["backprofile_image"] : backimage} className="img-fluid" id="backImage" alt="background img"></img>

                <div className="container" id="profileInfo">

                    <div className="profile_image">
                        <img src={props.profileDetails["profile_image"] ? props.profileDetails["profile_image"] : defaultProfile} id="profileImage" onClick={profileView} alt="profile img"></img>
                    </div>

                    <h4>{props.profileDetails["name"]}</h4>

                    <h6 id="proffesion">{ props.profileDetails["profession"] ? props.profileDetails["profession"] : "profession"}</h6>

                </div>
            </div>

        </>
    )
}
