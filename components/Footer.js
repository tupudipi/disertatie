// components/Footer.js

import React from 'react';

const Footer = () => {
    return (
        <div style={{
            marginTop: '0px',
            marginBottom: '0px',
            paddingBottom: '40px',
            paddingTop: '60px',
            position: 'fixed',
            bottom: '0',
            textAlign: 'center',
            backgroundColor: 'rgb(193, 203, 222)',
            color: 'rgb(255, 255, 255)',
            zIndex: '0',
            width: '100%'
          }}>
            <footer>
                <p>
                    <em><strong>„Platformă web pentru asistarea deciziilor în procesul de alegere a specializării de admitere”</strong></em>
                </p>
            </footer>
        </div>
    );
};

export default Footer;
