import React, { useEffect, useState } from 'react'
import About from '../components/About'
import SocialLinks from '../components/SocialLinks'
import ProfileHeader from '../components/ProfieHeader'
import Posts from '../components/Posts'
import LikesViewsProjects from '../components/LikesViewsProjects'
import Education from '../components/Education'
import Experience from '../components/Experience'
import SkillsAndProject from '../components/SkillsAndProject'

function Homepage() {
    const [profileDetails, setprofileDetails] = useState([]);
    const [socailLinkDetails, setSocailLinkDetails] = useState([]);
    const [educationDetails, setEducationDetails] = useState([]);
    const [posts, setPosts] = useState([]);
    const [experience, setExperience] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);


    // Getting the profile details
    useEffect(() => {
        getProfileDetails()
        getSocailLinkDetails()
        getEducationDetails()
        getPosts()
        getExperience()
        getSkill()
        getProject()
    }, []);

    let getProfileDetails = async () => {
        let response = await fetch('/api/get-profile/')
        let data = await response.json()
        setprofileDetails(data)
    }

    let getSocailLinkDetails = async () => {
        let response = await fetch('/api/get-sociallinks/')
        let data = await response.json()
        setSocailLinkDetails(data)
    }

    let getEducationDetails = async () => {
        let response = await fetch('/api/get-education/')
        let data = await response.json()
        setEducationDetails(data["results"])
    }

    let getPosts = async () => {
        let response = await fetch('/api/get-posts/')
        let data = await response.json()
        setPosts(data)
    }

    let getExperience = async () => {
        let response = await fetch('/api/get-experience/')
        let data = await response.json()
        setExperience(data["results"])
    }

    let getSkill = async () => {
        let response = await fetch('/api/get-skill/')
        let data = await response.json()
        setSkills(data["results"])
    }

    let getProject = async () => {
        let response = await fetch('/api/get-project/')
        let data = await response.json()
        setProjects(data["results"])
    }

    return (
        <>
            <ProfileHeader profileDetails={profileDetails} />

            <LikesViewsProjects total_certificates={profileDetails["total_certificates"]} total_posts={profileDetails["total_posts"]} total_projects={profileDetails["total_projects"]} />

            <About about={profileDetails["about_user"]} />

            {socailLinkDetails && socailLinkDetails["email"] !== "" && <SocialLinks socailLinkDetails={socailLinkDetails} />}
            
            <Education educationDetails={educationDetails} />

            <Experience experience={experience} />

            <SkillsAndProject skills={skills} projects={projects} />

            <Posts posts={posts} />
        </>
    )
}

export default Homepage