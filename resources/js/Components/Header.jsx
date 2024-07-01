import React, {useState} from 'react';
import {usePage} from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

const Header = () => {
    const {auth} = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="burger-menu" onClick={toggleMenu}>
                ☰
            </div>

            <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <NavLink href={route('products.index')} active={route().current('products.index')}>
                    <img className='header_icon' src="/icons/home.png" alt="Home"/>
                    {isMenuOpen && <p className='burger_text'>Головна</p>}
                </NavLink>

                <NavLink href={route('basket')} active={route().current('basket')}>
                    <img className='header_icon' src="/icons/basket.png" alt="Basket"/>
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
            </nav>
        </header>
    );
}

export default Header;
