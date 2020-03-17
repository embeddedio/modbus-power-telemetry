import React from 'react';

function Header() {
  return (
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <span className="navbar-brand brand-logo"><img src="/images/logo.svg" alt="logo1" /></span>
                <span className="navbar-brand brand-logo-mini" id="menu-click-button-right"><img src="/images/logo-mini.svg" alt="logo2" /></span>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span id="menu-click-button" className="mdi mdi-menu"></span>
            </button>           
            
            <button  className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <i className="mdi mdi-power"></i>
            </button>
            </div>
        </nav>

  );
}

export default Header;
