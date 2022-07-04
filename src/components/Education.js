import React from 'react'
import '../assests/Education.css'
import avtar from '../assests/avtar.png'

export default function Education(props) {
    return (
        <>
            <div id="EducationDiv">
                <p id="EducationText">Education</p>
                {props.educationDetails ? props.educationDetails.map((key, index) => (
                    <div id="schoolDiv" key={index}>
                        <img src={avtar} id="defaultImg" alt="default school" />

                        <div id="content">
                            <h6>{props.educationDetails[index]["school"]}</h6>
                            
                            <p id="score"> {props.educationDetails[index]["course"]}, {props.educationDetails[index]["stream"]} </p>

                            <p>{props.educationDetails[index]["start"]} - {props.educationDetails[index]["end"]}</p>
                        </div>
                    </div>
                ))
                    : ""}
            </div>
        </>
    )
}
