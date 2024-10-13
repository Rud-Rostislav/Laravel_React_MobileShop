import React, {useEffect, useState} from 'react';
import {usePage} from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

const Header = ({basketQuantity}) => {
    const {auth} = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const root = document.documentElement;
    const [darkMode, setDarkMode] = useState(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        return storedDarkMode === 'true' || storedDarkMode === null;
    });

    useEffect(() => {
        root.style.setProperty('--dark-background', darkMode ? '#0e0e0e' : '#ffffff');
        root.style.setProperty('--dark-2-background', darkMode ? '#202020' : '#303030');
        root.style.setProperty('--white', darkMode ? '#ffffff' : '#9a9a9a');
    }, [darkMode]);

    const changeMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    return (
        <header>
            <div className="burger-menu" onClick={toggleMenu}>☰</div>

            <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <NavLink href={route('main')} active={route().current('main')}>
                    <img className='header_icon' src="/icons/main.png" alt="Main"/>
                    {isMenuOpen && <p className='burger_text'>Головна</p>}
                </NavLink>

                <NavLink href={route('products.index')} active={route().current('products.index')}>
                    <img className='header_icon' src="/icons/shop.png" alt="Home"/>
                    {isMenuOpen && <p className='burger_text'>Магазин</p>}
                </NavLink>

                <NavLink href={route('basket')} active={route().current('basket')}>
                    <img className='header_icon' src="/icons/basket.png" alt="Basket"/>
                    {basketQuantity ? <p className='green'>{basketQuantity}</p> : null}
                    {isMenuOpen && <p className='burger_text'>Корзина</p>}
                </NavLink>

                {auth.user && (
                    <NavLink href={route('products.create')} active={route().current('products.create')}>
                        <img className='header_icon' src="/icons/add.png" alt="Add"/>
                        {isMenuOpen && <p className='burger_text'>Додати товар</p>}
                    </NavLink>
                )}

                {!auth.user && (
                    <NavLink href={route('login')} active={route().current('login')}>
                        <img className='header_icon' src="/icons/admin.png" alt="Admin"/>
                        {isMenuOpen && <p className='burger_text'>Авторизуватися</p>}
                    </NavLink>
                )}

                {auth.user && (
                    <NavLink href={route('dashboard')}
                             active={route().current('dashboard') || route().current('order.confirmed')}>
                        <img className='header_icon' src="/icons/admin.png" alt="Admin"/>
                        {isMenuOpen && <p className='burger_text'>Адмін панель</p>}
                    </NavLink>
                )}

                <NavLink href={route('projects.index')} active={route().current('projects.index')}>
                    <img className='header_icon' src="/icons/list.png" alt="Projects"/>
                    {isMenuOpen && <p className='burger_text'>Менеджер проєктів</p>}
                </NavLink>

                <NavLink>
                    <button onClick={changeMode} className="light_dark_mode">
                        <img className='header_icon' src={darkMode ? "/icons/dark_mode.png" : "/icons/light_mode.png"}
                             alt={darkMode ? "Dark Mode" : "Light Mode"}/>
                        {isMenuOpen &&
                            <p className='burger_text'>{darkMode ? "Темний режим" : "Світлий режим"}</p>}
                    </button>
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
