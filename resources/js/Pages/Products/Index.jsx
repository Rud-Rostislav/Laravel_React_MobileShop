import React, { useState, useEffect } from 'react';
import Header from "@/Pages/Header.jsx";
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = ({ products }) => {
    const [productsList] = useState(products);
    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.content);
        }
    }, []);

    const addToBasket = async (product) => {
        try {
            const response = await axios.post(
                route('add-to-basket', { ...product }),
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
                autoClose: 2000,
                theme: "dark",
            });

        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    return (
        <div>
            <Header />
            <Head title="Всі товари" />
            <ToastContainer />

            <h1>Всі товари</h1>

            <div className="products">
                {productsList.map((product) => (
                    <div className="product" key={product.id}>
                        <h2 style={{ fontSize: '1.4rem' }}>{product.name}</h2>

                        {product.photos && product.photos.length > 0 &&
                            <img src={`storage/${product.photos[0].path}`} alt="Product image" />
                        }

                        <p style={{ fontSize: '1.2rem' }}>Ціна: {product.price} грн</p>

                        <Link href={route('products.show', product.id)} className="more_info">Детальніше</Link>

                        {product.quantity > 0 ?
                            <button
                                onClick={() => addToBasket(product)}
                                className="add_to_basket"
                            >
                                Додати у корзину
                            </button>
                            : <p className="out_of_stock">Немає в наявності</p>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
