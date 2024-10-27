import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { IoMenu, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../../assets/images/ECON-Master.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -80;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    };

    return (
        <>
            <nav className="navbar">
                <Link className="logo" to="/">
                    <img src={Logo} alt="ECON Master" className="logo-img" />
                    <span className="site-name">ECON Master</span>
                </Link>

                <ul className="nav-links">
                    <li>
                        <HashLink smooth to="/#courses" scroll={scrollWithOffset}>
                            Courses
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to="/#videos" scroll={scrollWithOffset}>
                            Videos
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to="/#tests" scroll={scrollWithOffset}>
                            Exam Tests
                        </HashLink>
                    </li>
                    <li>
                        <button className="contribute-button">Contribute</button>
                    </li>
                </ul>

                <button className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <IoClose size={36} /> : <IoMenu size={36} />}
                </button>
            </nav>

            {/* Dropdown Menu with Slide Down/Up Animation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="dropdown-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ul>
                            <li>
                                <HashLink smooth to="/#courses" scroll={scrollWithOffset}>
                                    Courses
                                </HashLink>
                            </li>
                            <li>
                                <HashLink smooth to="/#videos" scroll={scrollWithOffset}>
                                    Videos
                                </HashLink>
                            </li>
                            <li>
                                <HashLink smooth to="/#tests" scroll={scrollWithOffset}>
                                    Exam Tests
                                </HashLink>
                            </li>
                            <li>
                                <button className="contribute-button">Contribute</button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}