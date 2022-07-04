import React from 'react'
import '../assests/About.css'

export default function About(props) {

    function myFunction() {
        var dots = document.getElementById("dots");
        var moreText = document.getElementById("more");
        var btnText = document.getElementById("myBtn");

        if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnText.innerHTML = "see more";
            moreText.style.display = "none";
        } else {
            dots.style.display = "none";
            btnText.innerHTML = "see less";
            moreText.style.display = "inline";
        }
    }

    return (
        <>
            <div id="aboutDiv">
                <p id="aboutText">About</p>

                {props.about? 
                    <p>
                        {props.about.length > 50? 
                            <>
                                {props.about.slice(0, 100)}
                                <span id="dots">...</span><span id="more">{props.about.slice(100)}</span>
                                <button onClick={myFunction} className="showBtn" id="myBtn">see more</button>
                            </>
                        : <p> {props.about} </p>}
                    </p>
                :
                 <p>About Info</p>}

                <div className="modal fade" id="aboutChange" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">About</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                    <label htmlFor="floatingTextarea">About...</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
