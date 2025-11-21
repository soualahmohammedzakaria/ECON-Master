// Footer.js
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../../../assets/images/ECON-Master.png';
import ESILogo from '../../../assets/images/ESI-Logo.png';

export default function Footer() {
    const [visits, setVisits] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch("https://countapi.mileshilliard.com/api/v1/get/econ-master-site")
            .then(res => res.json())
            .then(data => {
                if (typeof data.value === "number") {
                    setVisits(data.value);
                }
            })
            .catch(err => console.error("Sorry, an error occurred while fetching visit count:", err));
    }, []);

    return (
        <footer className="footer">
            <p><b>&copy; {new Date().getFullYear()} ECON Master. All rights reserved.</b></p>

            <div className="footer-content">
                <Link to="/" className="footer-logo-link">
                    <img src={Logo} alt="Site Logo" className="footer-logo" />
                </Link>

                <p>Made by <b>Soualah Mohammed Zakaria</b> for ESI Students ❤️</p>

                <a href="https://www.esi.dz" target="_blank" rel="noopener noreferrer" className="footer-logo-link">
                    <img src={ESILogo} alt="ESI" className="footer-logo" />
                </a>
            </div>

            <p>{"Contact me at: "}
                <a href="mailto:mz_soualahmohammed@esi.dz" className="footer-link">
                    mz_soualahmohammed@esi.dz
                </a>
            </p>

            <p 
                className="visits-counter-box" 
                title="Click to nudge" 
                onClick={() => setModalOpen(true)}
            >
                <FaEye className="visits-icon" />
                <span>Total Visits: <b>{visits !== null ? visits : "-"}</b></span>
            </p>

            {modalOpen && (
                <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">Visit Counter Nudge</h2>
                        <p className="visit-number">
                            {visits !== null ? visits : "-"}
                        </p>
                        <p>You just nudged the visit counter! 👀</p>
                        <p>Some say nudging counters builds character... We can't confirm that.</p>
                        <button className="close-button" onClick={() => setModalOpen(false)}>Go Back To Studying</button>
                    </div>
                </div>
            )}
        </footer>
    );
}