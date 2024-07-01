import React from "react";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

export default function Guest({children}) {
    return (
        <>
            <Header/>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-black">
                <div>
                    <h1>Авторизація</h1>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
            <Footer/>
        </>
    );
}
