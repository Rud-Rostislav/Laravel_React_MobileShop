import React from 'react';
import {Link, usePage} from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

const Header = () => {
    const {auth} = usePage().props;

    return (
        <header>
            <NavLink href={route('products.index')} active={route().current('products.index')}><img
                className='header_icon' src="/icons/home.png" alt="Home"/></NavLink>

            <NavLink href={route('basket')} active={route().current('basket')}><img className='header_icon'
                                                                                    src="/icons/basket.png"
                                                                                    alt="Basket"/></NavLink>

            {auth.user ? <NavLink href={route('products.create')} active={route().current('products.create')}><img
                className='header_icon' src="/icons/add.png"
                alt="Add"/></NavLink> : null}

            {auth.user ? null : <NavLink href={route('login')}><img className='header_icon' src="/icons/admin.png"
                                                                    alt="Admin"/></NavLink>}
            {auth.user ? <NavLink href={route('dashboard')}><img className='header_icon' src="/icons/admin.png"
                                                                 alt="Admin"/></NavLink> : null}
        </header>
    );
}

export default Header;
