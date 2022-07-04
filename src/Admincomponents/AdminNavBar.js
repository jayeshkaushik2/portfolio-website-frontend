import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export const AdminNavBar = () => {
    let { logoutUser } = useContext(AuthContext)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" aria-current="page" to="/admin">Admin</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/admin-profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-sociallinks">SocialLinks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-education">Education</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-experiance">Experiance</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-skills">Skills</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-projects">Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-posts">Posts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-certificates">Certifications</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Options
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="/" style={{textAlign: "center"}}>Back to Home</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item btn btn-danger" onClick={logoutUser} style={{textAlign: "center"}}>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
