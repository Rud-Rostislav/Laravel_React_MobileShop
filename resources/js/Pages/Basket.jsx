import React, {useState, useEffect} from 'react';
import Header from "@/Pages/Header.jsx";
import {Link} from "@inertiajs/react";

const Basket = ({basket}) => {
    const [basketItems, setBasketItems] = useState(basket);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = basketItems.reduce((total, product) => {
                // Ensure product.quantity is a valid number, default to 1 if not
                const quantity = typeof product.quantity === 'number' ? product.quantity : 1;
                return total + (product.product.price * quantity);
            }, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [basketItems]);

    const removeFromBasket = (index) => {
        console.log(basketItems);
        if (basketItems.length === 0) {
            axios.post(route('clear-basket'));
            setBasketItems([]);
        } else {
        const updatedBasket = [...basketItems];
        updatedBasket.splice(index, 1);
        setBasketItems(updatedBasket);
        }
    };

    const updateQuantity = (index, quantity) => {
        const updatedBasket = [...basketItems];
        updatedBasket[index].quantity = quantity;
        setBasketItems(updatedBasket);
    };

    return (
        <div>
            <Header/>

            {basketItems.length === 0 ? <h1>Кошик порожній</h1> :
                <div>
                    <h1>Кошик</h1>
                    <Link href={route('clear-basket')} style={{fontSize: '1.2rem'}}>Очистити кошик</Link>
                    <h2 style={{fontSize: '1.2rem', margin: '1vh'}}>Загально до сплати: {totalPrice} грн</h2>
                </div>
            }

            <div style={{display: 'flex', gap: '25px', justifyContent: 'center', margin: '5vh', flexWrap: 'wrap'}}>
                {basketItems.map((item, index) => (
                    <div key={index} style={{
                        boxShadow: 'black 0px 0px 10px -4px',
                        borderRadius: '10px',
                        padding: '25px',
                        width: '50vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        position: 'relative'
                    }}>
                        {item.photos && item.photos.length > 0 &&
                            <img src={`storage/${item.photos[0].path}`} alt="Product image"
                                 style={{width: '10vw'}}/>
                        }
                        <h2 style={{fontSize: '1.4rem'}}>{item.product.name}</h2>
                        <p style={{fontSize: '1.4rem'}}>Ціна: {item.product.price} грн</p>
                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity || 1} // Ensure quantity is always defined
                            onChange={(e) => updateQuantity(index, parseInt(e.target.value || 1))}
                            min={1} // Set minimum value for quantity input
                        />

                        <button onClick={() => removeFromBasket(index)}
                                style={{fontSize: '1.5rem', position: 'absolute', top: '20px', right: '20px'}}
                        >X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Basket;
