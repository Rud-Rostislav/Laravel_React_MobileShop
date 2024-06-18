import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ( {product}) => {
    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        if (token) {
            setCsrfToken(token.content);
        }
    }, []);

    const addToBasket = async (product) => {
        try {
            await axios.post(
                route('add-to-basket', product.id),
                null,
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    }
                }
            );
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
            <button onClick={() => addToBasket(product)} className="add_to_basket">
                Додати у корзину
            </button>
        </>
    );
};

export default Add;
