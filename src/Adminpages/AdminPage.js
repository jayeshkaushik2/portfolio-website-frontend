import React from 'react'
import { AdminBody } from '../Admincomponents/AdminBody';
import { AdminCertificates } from '../Admincomponents/AdminCertificates';
import { AdminEducation } from '../Admincomponents/AdminEducation';
import { AdminExperiance } from '../Admincomponents/AdminExperiance';
import { AdminNavBar } from '../Admincomponents/AdminNavBar';
import { AdminPosts } from '../Admincomponents/AdminPosts';
import { AdminProfile } from '../Admincomponents/AdminProfile';
import { AdminProjects } from '../Admincomponents/AdminProjects';
import { AdminSkills } from '../Admincomponents/AdminSkills';
import { AdminSocialLinks } from '../Admincomponents/AdminSocialLinks';


export const AdminPage = (props) => {
    return (
        <div>
            <AdminNavBar />
            {props.name === "admin"? <AdminBody />: ""}
            {props.name === "profile"? <AdminProfile />: ""}
            {props.name === "sociallinks"? <AdminSocialLinks />: ""}
            {props.name === "education"? <AdminEducation />: ""}
            {props.name === "experiance"? <AdminExperiance />: ""}
            {props.name === "skills"? <AdminSkills />: ""}
            {props.name === "projects"? <AdminProjects />: ""}
            {props.name === "posts"? <AdminPosts />: ""}
            {props.name === "certificates"? <AdminCertificates />: ""}
        </div>
    )
}
