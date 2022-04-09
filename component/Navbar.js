import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props)  {
        return (
            <div>
                <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">NewsMonkey</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item"><Link className="nav-link" to="/business">business</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/entertainment">entertainment</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/health">health</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/science">science</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/sports">sports</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/technology">technology</Link></li>

                            </ul>
                            <input type="color" id="selectcolor" name="head" value={props.color} className="mx-4" onChange={props.changecolor} />
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" onClick={props.togglemode} id="flexSwitchCheckDefault" />
                                <label className={`form-check-label text-${props.mode === "light" ? "dark" : "light"}`} htmlFor="flexSwitchCheckDefault">{props.mode === "dark" ? "light" : "dark"}</label>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
}
