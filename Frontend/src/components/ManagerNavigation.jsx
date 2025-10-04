import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles//Navbar.css';
import logo1 from "../assets/logo2.png";

const LogoIcon = () => (
    <svg height="32" width="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);
const ManagerNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navItems = [
        { name: 'manager-dashboard', path: '/manager-dasboard' },
        { name: 'manager-profile', path: '/manager-profile' },
    ];

    return (
        <>
            <header className="navbar-container">
                {/* Logo - Centered on top for desktop */}
                {/* <div className="navbar-logo">
                    <NavLink to="/">
                        <span>GoApprove</span>
                    </NavLink>
                </div> */}
                <div className="flex items-left mb-12">
                    <img
                        src={logo1}
                        alt="GoApprove Logo"
                        className="w-48 h-auto"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/256x64/5e17eb/ffffff?text=GoApprove'; }}
                    />
                </div>

                {/* Desktop Navigation Links */}
                <nav className="navbar-links-desktop">
                    {navItems.map((item) => (
                        <NavLink key={item.name} to={item.path} end>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Hamburger Button - Positioned absolutely */}
                <button
                    className="navbar-mobile-menu-button"
                    onClick={toggleSidebar}
                    aria-label="Open menu"
                    aria-expanded={isSidebarOpen}
                >
                    {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </header>

            {/* --- Mobile Sidebar --- */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`}
                onClick={toggleSidebar}
            ></div>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <LogoIcon />
                    <span>GoApprove</span>
                </div>
                <nav className="sidebar-links">
                    {navItems.map((item) => (
                        <NavLink key={item.name} to={item.path} end>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default ManagerNavbar;