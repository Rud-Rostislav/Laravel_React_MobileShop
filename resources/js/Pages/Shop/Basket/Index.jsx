import React, {useState, useEffect} from 'react';
import Header from "@/Components/Header.jsx";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/Components/Footer.jsx";
import {Link} from "@inertiajs/react";

const Index = ({basket}) => {
    const [basketItems, setBasketItems] = useState(basket);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = basketItems.reduce((total, product) => {
                return total + (product.product.price);
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
        <>
            <Header/>
            <ToastContainer/>
            <main className='main_create'>

                {basketItems.length === 0 ? <h1>Кошик порожній</h1> :
                    <>
                        <form method="POST" onSubmit={makeOrder} className='add_product'>
                            <input type="text" name='name' required placeholder='ПІБ'/>
                            <input type="email" name='email' required placeholder='Пошта'/>
                            <input type="text" name='phone' required placeholder='Номер телефону'/>
                            <textarea name="comment" placeholder='Коментар'></textarea>

                            <div className='basket_products'>
                                {basketItems.map((item, index) => (
                                    <Link href={route('products.show', item.product.id)} key={index}
                                          className='basket_product'>
                                        {item.photos.length > 0 ?
                                            <>
                                                <img src={`storage/${item.photos[0].path}`}
                                                     alt="Product image"/>
                                                <p className='product_name'>{item.product.name}</p>
                                                <p className='product_price'>{item.product.price} грн</p>
                                            </>
                                            :
                                            <>
                                                <img src='/images/empty_image.png' alt="Empty image"/>
                                                <p className='product_name'>{item.product.name}</p>
                                                <p className='product_price'>{item.product.price} грн</p>
                                            </>
                                        }
                                    </Link>
                                ))}
                            </div>

                            <p className='total_price'>Кількість товарів: <strong>{basketItems.length}</strong></p>
                            <p className='total_price'>До сплати: <strong>{totalPrice}</strong> грн</p>

                            <button type="submit" className='black_button green'>Замовити</button>
                            <button onClick={clearBasket} className='black_button red'>Очистити кошик</button>
                        </form>
                    </>
                }

            </main>
            <Footer/>
        </>
    );
};

export default Index;
