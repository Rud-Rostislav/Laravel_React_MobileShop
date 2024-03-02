import React, { useState } from 'react';
import Header from "@/Pages/Header.jsx";
import { Link } from "@inertiajs/react";

const Basket = ({ basket }) => {
    const [basketItems, setBasketItems] = useState(basket);
    console.log(basketItems)

    const totalPrice = basketItems.map((product) => product.product.price).reduce((a, b) => a + b, 0);

    const removeFromBasket = (index) => {
        // Create a copy of the basket array
        const updatedBasket = [...basketItems];
        // Remove the product at the specified index
        updatedBasket.splice(index, 1);
        // Update the basket state
        setBasketItems(updatedBasket);
    };

    return (
        <div>
            <Header />

            {basketItems.length === 0 ? <h1>Кошик порожній</h1> :
                <div>
                    <h1>Кошик</h1>
                    <Link href={route('clear-basket')} style={{ fontSize: '1.2rem' }}>Очистити весь кошик</Link>
                    <h2 style={{ fontSize: '1.4rem', margin: '1vh' }}>Загально до сплати {totalPrice} грн</h2>
                </div>
            }

            <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', margin: '5vh', flexWrap: 'wrap' }}>
                {basketItems.map((item, index) => (
                    <div key={index} style={{
                        boxShadow: 'black 0px 0px 10px -4px',
                        borderRadius: '10px',
                        padding: '1rem',
                        width: '25vw'
                    }}>
                        <h2 style={{ fontSize: '1.4rem' }}>{item.product.name}</h2>
                        {item.photos && item.photos.length > 0 &&
                            <img src={`storage/${item.photos[0].path}`} alt="Product image"
                                 style={{ width: '10vw', margin: '5vh auto' }} />
                        }
                        <p style={{ fontSize: '1.2rem' }}>Ціна: {item.product.price} грн</p>
                        <button onClick={() => removeFromBasket(index)}>Видалити з корзини</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Basket;
