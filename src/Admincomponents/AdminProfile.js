import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';

export const AdminProfile = () => {
    const [User, setUser] = useState("")
    const [Name, setName] = useState("")
    const [Profile_image, setProfile_image] = useState("")
    const [Backprofile_image, setBackprofile_image] = useState("")
    const [About_user, setAbout_user] = useState("")
    const [Profession, setProfession] = useState("")

    useEffect(() => {
        getProfileData()
    }, []);

    let getProfileData = async () => {
        let response = await fetch('/api/get-profile/')
        let data = await response.json()
        setUser(data["user"]?data["user"]:"")
        setName(data["name"]? data["name"]:"")
        setProfile_image(data["profile_image"]?data["profile_image"]:"")
        setBackprofile_image(data["backprofile_image"]?data["backprofile_image"]:"")
        setAbout_user(data["about_user"]?data["about_user"]:"")
        setProfession(data["profession"]?data["profession"]:"")
    }

    let {AuthTokens} = useContext(AuthContext)

    let postProfileData = async (data) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer '+String(AuthTokens.access) },
            body: data
        };
        let response = await fetch('/api/get-profile/', requestOptions);
        let response_data = await response.json();
        getProfileData()
    }


    const submitProfileData = (e) => {
        e.preventDefault()
        console.log(Profile_image, Profile_image.name)
        const new_data = new FormData();
        new_data.append('name', Name)

        // TODO: have to fix image upload
        // if (Profile_image !== null){
        //     new_data.append('profile_image', Profile_image, Profile_image.name)
        // }

        // new_data.append('backprofile_image', Backprofile_image, Backprofile_image?.name)
        new_data.append('about_user', About_user)
        new_data.append('profession', Profession)
        console.log("new data", new_data)
        postProfileData(new_data)
    }

    return (
        <div className="container">
            <form>
                <div className="input-group flex-nowrap my-3">
                    <span className="input-group-text" id="addon-wrapping">Name</span>
                    <input type="text" className="form-control" placeholder="Name" aria-label="name" value={Name} aria-describedby="addon-wrapping" onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">Upload Profile Image</label>
                    <input type="file" className="form-control" id="inputGroupFile01" onChange={(e) => setProfile_image(e.target.files[0])} />
                </div>

                {/* <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">Upload Backgroud Image</label>
                    <input type="file" className="form-control" id="inputGroupFile01" onChange={(e) => setBackprofile_image(e.target.files[0])} />
                </div> */}

                <div className="input-group mb-3">
                    <span className="input-group-text">About</span>
                    <textarea className="form-control" aria-label="With textarea" value={About_user} onChange={(e) => setAbout_user(e.target.value)} ></textarea>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Profession</span>
                    <input type="text" className="form-control" placeholder="Profession" aria-label="profession" aria-describedby="basic-addon1" value={Profession} onChange={(e) => setProfession(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={submitProfileData}>Submit</button>
            </form>
        </div>
    )
}
