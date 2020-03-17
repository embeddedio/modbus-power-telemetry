import React from 'react';
import { Link } from "react-router-dom";

function Sidebar() {
  return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item nav-profile">
                        <span className="nav-link">
                            <div className="nav-profile-image">
                            <img src="/images/faces/face1.jpg" alt="profile"/>
                            <span className="login-status online"></span>
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2">David Grey. H</span>
                            <span className="text-secondary text-small">Project Manager</span>
                            </div>
                            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </span>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" style={{textDecoration:'none'}}> 
                            <span className="nav-link">
                                <span className="menu-title">Dashboard</span>
                                <i className="mdi mdi-chart-bar menu-icon"></i>
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/history" style={{textDecoration:'none'}}> 
                            <span className="nav-link">
                                <span className="menu-title">History</span>
                                <i className="mdi mdi-file-document-box menu-icon"></i>
                            </span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic" >
                    
                            <span className="menu-title">Settings</span>
                            <i className="menu-arrow"></i>
                            <i className="mdi mdi-crosshairs-gps menu-icon"></i>
                        </a>
                        <div className="collapse show" id="ui-basic">
                            <ul className="nav flex-column sub-menu">                            
                                <li className="nav-item"> 
                                    <Link to="/settings/general" style={{textDecoration:'none'}}> 
                                        <span className="nav-link">General Setting</span>
                                    </Link>
                                </li>
                                <li className="nav-item"> 
                                    <Link to="/settings/modbus" style={{textDecoration:'none'}}> 
                                        <span className="nav-link">Modbus</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                   
                </ul>
            </nav>   
  );
}

export default Sidebar;
