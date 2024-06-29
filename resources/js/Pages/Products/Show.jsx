import React, {useState} from 'react';
import Header from "@/Components/Header.jsx";
import {Head, usePage} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Add from "@/Pages/Basket/Add.jsx";
import Footer from "@/Components/Footer.jsx";

const Show = ({product}) => {
    const {auth} = usePage().props;
    const [slider, setSlider] = useState(0);

    const previousSlide = () => {
        if (slider === 0) {
            setSlider(product.photos.length - 1);
        } else {
            setSlider(slider - 1);
        }
    }

    const nextSlide = () => {
        if (slider === product.photos.length - 1) {
            setSlider(0);
        } else {
            setSlider(slider + 1);
        }
    }

    return (
        <>
            <Header/>
            <Head title={product.name}/>
            <ToastContainer/>

            <main className='main_show'>

                <div className="product_show">
                    <p className="product_name">{product.name}</p>

                    {product.photos && product.photos.length > 0 ?
                        <div className='slider'>
                            <button onClick={previousSlide} className='slider_button'>&#60;</button>

                            <img className='image_show' src={`/storage/${product.photos[slider].path}`}
                                 alt="Product image"/>

                            <button onClick={nextSlide} className='slider_button'>&#62;</button>
                        </div>

                        : <p className='empty_image'></p>
                    }

                    <p>{product.description}</p>

                    <p>Ціна: {product.price} грн</p>

                    {product.quantity > 0 ?
                        <Add product={product}/>
                        : <button className='more_info quantity_zero'>Немає в
                            наявності</button>

                    }

                    {auth.user ?
                        <div className="buttons">
                            <a href={route('products.edit', product.id)} className='more_info'>Редагувати</a>
                            <Dropdown.Link as="button" href={route('products.destroy', product.id)}
                                           method="delete" className="more_info delete">Видалити</Dropdown.Link>
                        </div> : null}

                </div>

            </main>
            <Footer/>
        </>
    );
}

export default Show;
