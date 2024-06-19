import React, {useState, useEffect} from 'react';
import Header from "@/Components/Header.jsx";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = ({basket}) => {
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
                setBasketItems([]);
            })
            .catch(error => {
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
                    <button onClick={clearBasket} style={{color: 'red', margin: '2vh 0'}}>Очистити кошик</button>

                    <form method="POST" onSubmit={makeOrder}
                          style={{
                              display: 'flex',
                              justifyContent: 'center',
                              flexDirection: 'column',
                              gap: '10px',
                              boxShadow: 'black 0px 0px 10px -4px',
                              borderRadius: '10px',
                              padding: '25px',
                              width: '50vw',
                              margin: '0 auto 2.5vh auto'
                          }}>
                        <h1>Оформлення замовлення</h1>
                        <p>Ім'я</p>
                        <input type="text" name='name' required/>
                        <p>Пошта</p>
                        <input type="email" name='email' required/>
                        <p>Телефон</p>
                        <input type="text" name='phone' required/>
                        <p>Коментар</p>
                        <textarea name="comment" style={{marginBottom: '50px'}}></textarea>

                        {basketItems.map((item, index) => (
                            <div key={index} style={{
                                boxShadow: 'black 0px 0px 10px -4px',
                                borderRadius: '10px',
                                height: '15vh',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                alignItems: 'center',
                                justifyItems: 'center',
                            }}>
                                {item.photos.length > 0 ?
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        alignItems: 'center'
                                    }}>
                                        <img src={`storage/${item.photos[0].path}`} alt="Product image"
                                             style={{width: '4vw'}}/>
                                        <h2 style={{fontSize: '1.4rem'}}>{item.product.name}</h2>
                                    </div>
                                    :
                                    <h2 style={{fontSize: '1.4rem'}}>{item.product.name}</h2>
                                }
                                <p style={{fontSize: '1.4rem'}}>Ціна: {item.product.price} грн</p>
                            </div>
                        ))}

                        <h2 style={{marginTop: '50px'}}>Загально до сплати: <strong>{totalPrice}</strong> грн</h2>

                        <button type="submit" className='add_to_basket'
                                style={{margin: '2.5vh auto 0 auto', width: '100%'}}>Замовити
                        </button>
                    </form>
                </div>
            }

        </div>
    );
};

export default Index;
