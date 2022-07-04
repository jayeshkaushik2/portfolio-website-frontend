import React from 'react'
import '../assests/SocialLinks.css'
import { Link } from 'react-router-dom';

export default function SocialLinksDiv(props) {
    return (
        <>
            <div id="SocialLinksDiv">
                <p className="p-links">
                {/* <Link className="link-dark"> {props.socailLinkDetails["email"]} </Link> */}
                <i className="fa fa-envelope"></i> Email: { props.socailLinkDetails["email"] ? props.socailLinkDetails["email"] : ""}
                </p>
                <p className="p-links">
                <i className="fa fa-linkedin-square"></i> LinkedIn: {props.socailLinkDetails["linkedin"] ? <Link  className="link-primary a-link" to={props.socailLinkDetails["linkedin"]}> {props.socailLinkDetails["linkedin"].slice(8,)} </Link> : ""}
                </p>
                <p className="p-links">
                <i className="fa fa-github"></i> GitHub: { props.socailLinkDetails["github"] ? <Link className="link-primary a-link" to={props.socailLinkDetails["github"]}> {props.socailLinkDetails["github"].slice(8,)} </Link> : ""}
                </p>
                <p className="p-links">
                <i className="fa fa-code"></i> Leetcode: { props.socailLinkDetails["coding"] ? <Link  className="link-primary a-link" to={props.socailLinkDetails["coding"]}> {props.socailLinkDetails["coding"].slice(8,)} </Link> : ""}
                </p>
            </div>
        </>
    )
}
