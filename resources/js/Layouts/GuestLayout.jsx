import React from "react";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

export default function Guest({children}) {
    return (
        <>
            <Header/>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
                 style={{background: '#0e0e0e'}}>
                <div>
                    <h1>Авторизація</h1>
                </div>

                <div
                    className="w-full sm:max-w-md mt-6 px-6 py-4 bg-dark overflow-hidden sm:rounded-lg"
                    style={{background: '#202020', boxShadow: '0 0 10px -5px #ffffff' }}>
                    {children}
                </div>
            </div>
            <Footer/>
        </>
    );
}
