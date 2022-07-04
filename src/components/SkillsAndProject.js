import React from 'react'
import '../assests/SkillsAndProject.css'

export default function SkillsAndProject(props) {

    // function myFunction() {
    //     var dots = document.getElementById("dots1");
    //     var moreText = document.getElementById("remainDescription");
    //     var btnText = document.getElementById("seeDescriptionBtn");

    //     if (dots.style.display === "none") {
    //         dots.style.display = "inline";
    //         btnText.innerHTML = "see more";
    //         moreText.style.display = "none";
    //     } else {
    //         dots.style.display = "none";
    //         btnText.innerHTML = "see less";
    //         moreText.style.display = "inline";
    //     }
    // }

    return (
        <>
            <div id="SkillsAndProjectDiv">
                <div>
                    <p id="skillsandprojectText">Skills & Projects</p>
                    {props.skills ? props.skills.map((key, index) => (
                        <h6 key={index} className="skills">{props.skills[index]["skill_name"]}</h6>
                    ))
                        : ""}
                </div>

                <hr />

                <div>
                    {props.projects ? props.projects.map((key, index) => (
                        <span key={index}>
                            <h6>{index + 1}) {props.projects[index]["title"]}</h6>
                            <span id="projectDate">{props.projects[index]["start"]} - {props.projects[index]["is_active"]? "Present" : props.projects[index]["end"]}</span>

                            <div id="description">
                                <p>{props.projects[index]["description"]}</p>
                                {/* <p>{props.projects[index]["description"].slice(0, 70)}<span id="dots1">...</span><span id="remainDescription">{props.projects[index]["description"].slice(70, )}</span>
                                    <button onClick={myFunction} className="showBtn" id="seeDescriptionBtn">see more</button>
                                </p> */}
                                <a className="link-primary" href={props.projects[index]["link"]} id="projectLink">See project</a>
                            </div>
                            {index < props.projects.length-1 ?<hr /> : ""}
                        </span>
                    )) : ""}

                </div>
            </div>
        </>
    )
}
