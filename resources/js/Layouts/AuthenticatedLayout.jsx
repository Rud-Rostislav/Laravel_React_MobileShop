import {useState} from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

export default function Authenticated({user, children}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <main>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Header/>
                    <div
                        style={{
                            border: '1px solid #323232',
                            padding: '10px',
                            borderRadius: '15px',
                            background: '#202020',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0px auto 25px auto',
                        }}
                        className="flex justify-between h-16">
                        <div className="flex">

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink style={{color: '#ffffff'}} href={route('orders')}
                                         active={route().current('orders')}>
                                    Замовлення
                                </NavLink>

                                <NavLink style={{color: '#ffffff'}} href={route('order.confirmed')}
                                         active={route().current('order.confirmed')}>
                                    Виконані замовлення
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Профіль</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Вийти
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 space-y-1 text-white">
                        {/*<ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>*/}
                        {/*    Dashboard*/}
                        {/*</ResponsiveNavLink>*/}
                    </div>

                    <div className="pb-1">
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink className='text-white'
                                               href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink className='text-white' method="post" href={route('logout')}
                                               as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
                {children}
            </main>
            <Footer/>
        </>

    );
}
