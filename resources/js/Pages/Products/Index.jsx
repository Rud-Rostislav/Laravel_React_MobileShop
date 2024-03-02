import React, { useState, useEffect } from 'react';
import Header from "@/Pages/Header.jsx";
import { Head, Link } from '@inertiajs/react';
import axios from 'axios'; // Import axios for making HTTP requests

const Index = ({ products }) => {
    const [productsList] = useState(products);
    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        // Fetch CSRF token from the meta tag
        const token = document.head.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.content);
        }
    }, []);

    const addToBasket = async (product) => {
        try {
            // Make a POST request to add the product to the basket
            const response = await axios.post(
                route('add-to-basket', { ...product }),
                null,
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    }
                }
            );
            console.log(response.data); // Log the response
        } catch (error) {
            console.error('Error:', error.response.data); // Log the error
        }
    };

    return (
        <div>
            <Header />
            <Head title="Всі товари" />

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
