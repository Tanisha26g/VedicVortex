import React from 'react';
import "@fontsource/open-sans";
import logo from '../Images/logo.png';

function HeaderSection() {
    return (
        <div className="slide-right" style={{ marginLeft: '100px', height: '70px', display: 'flex', alignItems: 'center' }}>
            <img 
                style={{ height: '50px', width: '50px', marginRight: '30px' }} 
                src={logo} 
                alt="AGRI ASSIST Logo" 
            />
            <span style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                AGRI ASSIST
            </span>
        </div>
    );
}

export default HeaderSection;
