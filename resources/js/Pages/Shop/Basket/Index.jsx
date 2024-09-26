import React, {useState, useEffect} from 'react';
import Header from "@/Components/Header.jsx";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/Components/Footer.jsx";
import {Link, useForm} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown.jsx";

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

    const {data, setData} = useForm({
        name: '',
        email: '',
        phone: '',
        comment: '',
        products_id: [],
        products_quantity: {},
    });

    const clearBasket = () => {
        axios.post(route('clear-basket'));
        setBasketItems([]);
        toast.success('Кошик очищено', {
            position: "bottom-center",
            hideProgressBar: true,
            autoClose: 2000,
            theme: "dark",
        });
        window.location.href = route('products.index');
    };

    const removeFromBasket = (product) => {
        axios.delete(route('remove-from-basket', product.id))
            .then(() => {
                setBasketItems(basketItems.filter(item => item.product.id !== product.id));
            })
    };

    const makeOrder = (e) => {
        e.preventDefault();
        const quantities = basketItems.map(item => data.products_quantity[item.product.id] || 1);

        axios.post(route('order.store'), {
            name: data.name,
            email: data.email,
            phone: data.phone,
            comment: data.comment,
            products_id: JSON.stringify(basketItems.map(item => item.product.id)),
            products_quantity: JSON.stringify(quantities),
        })

        toast.success('Замовлення оформлено', {
            position: "bottom-center",
            hideProgressBar: true,
            autoClose: 2000,
            theme: "dark",
        });
        clearBasket();
    };

    return (
        <>
            <Header/>
            <ToastContainer/>
            <main className='main_create'>

                {basketItems.length === 0 ? <h1>Кошик порожній</h1> :
                    <>
                        <form method="POST" onSubmit={makeOrder} className='add_product'>
                            <input type="text" name='name' required placeholder='ПІБ'
                                   onChange={e => setData('name', e.target.value)} value={data.name}/>
                            <input type="email" name='email' required placeholder='Пошта'
                                   onChange={e => setData('email', e.target.value)} value={data.email}/>
                            <input type="text" name='phone' required placeholder='Номер телефону'
                                   onChange={e => setData('phone', e.target.value)} value={data.phone}/>
                            <textarea name="comment" placeholder='Коментар'
                                      onChange={e => setData('comment', e.target.value)}
                                      value={data.comment}></textarea>

                            <div className='basket_products'>
                                {basketItems.map((item, index) => (
                                    <div className='basket_product' key={index}>
                                        <Link href={route('products.show', item.product.id)}>
                                            {item.photos.length > 0 ?
                                                <img src={`storage/${item.photos[0].path}`}
                                                     alt="Product image"/>
                                                :
                                                <img src='/images/empty_image.png' alt="Empty image"/>
                                            }
                                        </Link>

                                        <p className='product_name'>{item.product.name}</p>
                                        <p className='product_price'>{item.product.price} грн</p>

                                        <div className='basket_buttons'>
                                            <input
                                                type="number"
                                                name={`quantity-${item.product.id}`}
                                                onChange={e => {
                                                    const quantity = e.target.value;
                                                    setData('products_quantity', {
                                                        ...data.products_quantity,
                                                        [item.product.id]: quantity
                                                    });
                                                }}
                                                value={data.products_quantity[item.product.id] || 1}
                                                min="1"
                                            />

                                            <Dropdown.Link as="button"
                                                           href={route('remove-from-basket', item.product.id)}
                                                           method="delete"
                                                           onClick={() => removeFromBasket(item.product)}
                                                           className="black_button red">X</Dropdown.Link>
                                        </div>

                                    </div>
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
