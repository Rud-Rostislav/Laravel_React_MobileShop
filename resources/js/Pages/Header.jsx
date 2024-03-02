import React from 'react';
import {Link, usePage} from '@inertiajs/react';

const Header = () => {
    const {auth} = usePage().props;

    return (
        <header>
            <Link href={route('products.index')}><img className='header_icon' src="/icons/home.png" alt="Home"/></Link>
            <Link href={route('basket')}><img className='header_icon' src="/icons/basket.png" alt="Basket"/></Link>
            {auth.user ? <Link href={route('products.create')}><img className='header_icon' src="/icons/add.png"
                                                                    alt="Add"/></Link> : null}
            {auth.user ? null : <Link href={route('login')}><img className='header_icon' src="/icons/admin.png"
                                                                 alt="Admin"/></Link>}
            {auth.user ? <Link href={route('dashboard')}><img className='header_icon' src="/icons/admin.png"
                                                              alt="Admin"/></Link> : null}
        </header>
    );
}

export default Header;
