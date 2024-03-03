import React, {useEffect, useState} from 'react';
import Header from "@/Pages/Header.jsx";
import {Head, usePage} from "@inertiajs/react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Dropdown from "@/Components/Dropdown.jsx";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Show = ({product}) => {
    const {auth} = usePage().props;
    const [csrfToken, setCsrfToken] = useState(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500
    };

    useEffect(() => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.content);
        }
    }, []);

    const addToBasket = async (product) => {
        try {
            const response = await axios.post(
                route('add-to-basket', product.id),
                null,
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    }
                }
            );
            // Display a success notification
            toast.success('Товар додано до кошика', {
                position: "bottom-center",
                hideProgressBar: true,
                autoClose: 1500,
                theme: "dark",
            });
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    return (
        <>
            <Header/>
            <Head title={product.name}/>
            <ToastContainer />

            <div className="products" style={{fontSize: '1.2rem', minHeight: '95vh'}}>
                <div className="product" style={{width: '50vw'}}>
                    <h3>{product.name}</h3>

                    {product.photos.length > 1 ?
                        <Slider {...settings} style={{width: '40vh'}}>
                            {product.photos.map((photo, index) => (
                                <div key={index}>
                                    <img src={`/storage/${photo.path}`} alt={`Photo ${index + 1}`}/>
                                </div>
                            ))}
                        </Slider>
                        :
                        product.photos.map((photo, index) => (
                            <img key={index} src={`/storage/${photo.path}`} alt={`Photo ${index + 1}`}
                                 style={{width: '40vh'}}/>
                        ))
                    }

                    <p style={{margin: '50px 0 25px 0'}}>{product.description}</p>


                    <p>Ціна: {product.price} грн</p>

                    {product.quantity > 0 ?
                        <button
                            onClick={() => addToBasket(product)}
                            className="add_to_basket"
                        >
                            Додати у корзину
                        </button>
                        : <p className="out_of_stock">Немає в наявності</p>
                    }

                    {auth.user ?
                        <div style={{width: '100%'}}>
                            <p style={{
                                fontSize: '1.2rem',
                                marginBottom: '25px'
                            }}> {product.quantity > 0 ? 'Залишилось: ' + product.quantity + ' шт' : null}</p>

                            <div className="buttons" style={{width: '100%', justifyContent: 'center'}}>

                                <a href={route('products.edit', product.id)} className='more_info'
                                   style={{fontSize: '1.2rem', width: '50%', height: '5vh'}}>Редагувати</a>

                                <Dropdown.Link as="button" href={route('products.destroy', product.id)}
                                               method="delete" style={{
                                    fontSize: '1.2rem',
                                    width: '50%',
                                    textAlign: 'center',
                                    height: '5vh'
                                }} className="more_info delete">Видалити</Dropdown.Link>
                            </div>

                        </div> : null}

                </div>
            </div>
        </>
    );
}

export default Show;
