import React from 'react'
import '../assests/Experience.css'
import avtarForCompany from '../assests/avtarForCompany.png'

export default function Experience(props) {
    return (
        <>
            <div id="ExperienceDiv">
                <p id="experienceText">Experience</p>
                {props.experience ? props.experience.map((key, index) => (
                    <div id="schoolDiv" key={index}>
                        <img src={avtarForCompany} id="defaultImg" alt="default school" />

                        <div id="content">
                            <h6>{props.experience[index]["position"]}</h6>
                            <p id="score">{props.experience[index]["company"]} . {props.experience[index]["type"]}</p>
                            <p>{props.experience[index]["start"]} - {props.experience[index]["is_active"]? "Present" : props.experience[index]["end"] } </p>
                            <p>{props.experience[index]["is_active"]}</p>
                        </div>
                    </div>
                )) : ""}
            </div>
        </>
    )
}
