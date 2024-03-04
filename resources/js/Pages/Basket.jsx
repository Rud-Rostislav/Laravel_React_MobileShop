import React, {useState, useEffect} from 'react';
import Header from "@/Pages/Header.jsx";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Basket = ({basket}) => {
    const [basketItems, setBasketItems] = useState(basket);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = basketItems.reduce((total, product) => {
                const quantity = typeof product.quantity === 'number' ? product.quantity : 1;
                return total + (product.product.price * quantity);
            }, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [basketItems]);

    const removeFromBasket = (index) => {
        if (basketItems.length === 0) {
            axios.post(route('clear-basket'));
            setBasketItems([]);
        } else {
            const updatedBasket = [...basketItems];
            updatedBasket.splice(index, 1);
            setBasketItems(updatedBasket);
        }
    };

    const clearBasket = () => {
        axios.post(route('clear-basket'));
        setBasketItems([]);
    };

    const makeOrder = (e) => {
        e.preventDefault();
        axios.post(route('order.store'), {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                comment: e.target.comment.value,
                products_id: String(basketItems.map(item => item.product.id)),
            }
        );

        axios.post(route('clear-basket'))
            .then(response => {
                // Handle successful response
                setBasketItems([]); // Clear the basket items
                // Any other actions you want to perform after clearing the basket
            })
            .catch(error => {
                // Handle error
                console.error('Error clearing basket:', error);
            });


        toast.success('Замовлення оформлено', {
            position: "bottom-center",
            hideProgressBar: true,
            autoClose: 2000,
            theme: "dark",
        });

    };

    return (
        <div>
            <Header/>
            <ToastContainer/>
            {basketItems.length === 0 ? <h1>Кошик порожній</h1> :
                <div>
                    <h1>Кошик</h1>
                    <button onClick={clearBasket}>Очистити кошик</button>
                    <h2 style={{fontSize: '1.2rem', margin: '1vh'}}>Загально до сплати: {totalPrice} грн</h2>


                    <div style={{
                        display: 'flex',
                        gap: '25px',
                        justifyContent: 'center',
                        margin: '5vh',
                        flexWrap: 'wrap'
                    }}>
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
                                <button onClick={() => removeFromBasket(index)}
                                        style={{fontSize: '1.5rem', position: 'absolute', top: '20px', right: '20px'}}
                                >X
                                </button>
                            </div>
                        ))}
                    </div>
                    <form method="POST" onSubmit={makeOrder}
                          style={{
                              display: 'flex',
                              justifyContent: 'center',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '10px'
                          }}>
                        <p>Ім'я</p>
                        <input type="text" name='name' required/>
                        <p>Пошта</p>
                        <input type="email" name='email' required/>
                        <p>Телефон</p>
                        <input type="text" name='phone' required/>
                        <p>Коментар</p>
                        <textarea name="comment"></textarea>

                        <button type="submit" className='add_to_basket'
                                style={{width: '300px', margin: '5vh 0'}}>Оформити
                            замовлення
                        </button>
                    </form>
                </div>
            }

        </div>
    );
};

export default Basket;
