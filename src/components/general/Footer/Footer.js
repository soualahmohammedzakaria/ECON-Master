// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../../../assets/images/ECON-Master.png';
import ESILogo from '../../../assets/images/ESI-Logo.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <Link to="/" className="footer-logo-link">
                    <img src={Logo} alt="Site Logo" className="footer-logo" />
                </Link>
                <p>Made by <b>Soualah Mohammed Zakaria</b> for ESI Students ❤️</p>
                <a href="https://www.esi.dz" target="_blank" rel="noopener noreferrer" className="footer-logo-link">
                    <img src={ESILogo} alt="ESI" className="footer-logo" />
                </a>
            </div>
            <p>Contact me at: <a href="mailto:mz_soualahmohammed@esi.dz" className="footer-link">mz_soualahmohammed@esi.dz</a></p>
        </footer>
    );
}