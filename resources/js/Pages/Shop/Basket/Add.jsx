import React, {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({product, basketQuantity, setBasketQuantity, basket}) => {
    const [basketItems, setBasketItems] = useState(basket);

    const addToBasket = (product) => {
        if (basketItems.some((item) => item.product.id === product.id)) {
            toast.error('Товар вже в кошику', {
                position: "top-right",
                autoClose: 1500,
                theme: "dark",
            });
        } else {
            axios.post(
                route('add-to-basket', product.id),
            );
            toast.success('Додано до кошика', {
                position: "top-right",
                autoClose: 1500,
                theme: "dark",
            });
            setBasketQuantity(basketQuantity + 1);
            setBasketItems([...basketItems, {product}]);
        }
    };

    return (
        <>
            <button onClick={() => setTimeout(() => addToBasket(product), 100)} className="black_button green">
                Додати у кошик
            </button>
        </>
    );
};

export default Add;
