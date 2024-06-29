import React from 'react';
import Header from "@/Components/Header.jsx";
import {Head, usePage} from "@inertiajs/react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Dropdown from "@/Components/Dropdown.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Add from "@/Pages/Basket/Add.jsx";

const Show = ({product}) => {
    const {auth} = usePage().props;

    return (
        <>
            <Header/>
            <Head title={product.name}/>
            <ToastContainer/>

            <div className="products"
                 style={{fontSize: '1.2rem', minHeight: '95vh', gridTemplateColumns: '1fr', justifyItems: 'center'}}>
                <div className="product" style={{width: '50vw',}}>
                    <h3>{product.name}</h3>

                    {product.photos.length > 1 ?
                        <Slider style={{width: '20vw'}}>
                            {product.photos.map((photo, index) => (
                                <div key={index}>
                                    <img src={`/storage/${photo.path}`} alt={`Photo ${index + 1}`}
                                         style={{width: '20vw'}}/>
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
                        <Add product={product}/>
                        : <button className='more_info' style={{ cursor: 'not-allowed', color: 'red'}}>Немає в наявності</button>

                    }

                    {auth.user ?
                        <div style={{width: '100%'}}>
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
