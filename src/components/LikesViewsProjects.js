import React from 'react'
import '../assests/LikesViewsProjects.css'

export default function LikesViewsProjects(props) {
    return (
        <div>
            <div id="LikesViewsProjectsDiv">
                <div className="row" id="rowForLink">
                    <div className="col" id="columns"> <span id="spans">{props.total_certificates}</span> <i className="fa fa-certificate"></i> Certificates</div>
                    <div className="col" id="midColumn"> <span id="spans">{props.total_posts}</span> <i className='fa fa-image'></i> Posts</div>
                    <div className="col" id="columns"> <span id="spans">{props.total_projects}</span> <i className='fa fa-folder-open'></i> Projects</div>
                </div>
            </div>
        </div>
    )
}
