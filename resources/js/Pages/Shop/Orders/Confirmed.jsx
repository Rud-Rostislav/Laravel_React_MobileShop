import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';
import React, {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Confirmed({auth, orders, products}) {
    const [ordersList] = useState(orders);
    const [productsList] = useState(products);
    const [openOrders, setOpenOrders] = useState({});

    const getProductsByIds = (order) => {
        const productIds = JSON.parse(order.products_id);
        return productIds.map(id => productsList.find(product => product.id === id));
    };

    const notConfirmOrder = () => {
        setTimeout(() => window.location.reload(), 100);
    };

    function toggleProducts(orderId) {
        setOpenOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    }

    const allProductsToggle = () => {
        for (let i = 0; i < ordersList.length; i++) {
            toggleProducts(ordersList[i].id);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Кабінет"/>

            <h1>Всього виконаних замовлень: {ordersList.filter(order => order.confirmed).length}</h1>
            <button onClick={allProductsToggle}
                    className='all_products_toggle'>{openOrders[1] !== true ? 'Приховати все ⯅' : 'Показати все ⯆'}</button>

            <div className='orders'>
                {ordersList.filter(order => order.confirmed).map(order => (
                    <div key={order.id}>
                        <div className='order order_confirmed_header order_header' key={order.id}>
                            <button onClick={() => toggleProducts(order.id)}>
                                {openOrders[order.id] ? '⯅' : '⯆'}
                            </button>

                            <p>{order.name} - {order.email} - {order.phone}</p>
                            <p>{order.comment.length > 0 ? order.comment : ''}</p>

                            <p>{new Date(order.updated_at).toLocaleString()}</p>

                            <p>
                                Загально
                                ({JSON.parse(order.products_quantity).reduce((total, quantity) => total + parseInt(quantity), 0)} шт.)
                                - {getProductsByIds(order).reduce((total, product, index) => {
                                const quantity = parseInt(JSON.parse(order.products_quantity)[index] || 0);
                                const price = product?.price || 0;
                                return total + (price * quantity);
                            }, 0)} грн.
                            </p>
                            <Dropdown.Link as="button" href={route('order.destroy', order.id)}
                                           method="delete" className='black_button red'
                                           onClick={notConfirmOrder}>Видалити</Dropdown.Link>

                            <Dropdown.Link as="button" href={route('order.notConfirm', order)} method='patch'
                                           className='black_button red'
                                           onClick={notConfirmOrder}>Не виконано</Dropdown.Link>
                        </div>

                        {openOrders[order.id] &&
                            <div className='order'>
                                {getProductsByIds(order).map((product, index) => (
                                    <Link href={route('products.show', product)} key={product?.id}
                                          className='order_product'>
                                        {product?.photos && product.photos.length > 0 &&
                                            <img src={`/storage/${product.photos[0].path}`} alt="Product image"
                                                 className='order_product_image'/>
                                        }
                                        <p>{product?.name}</p>
                                        <p>{product?.price} грн</p>
                                    </Link>
                                ))}
                            </div>
                        }

                    </div>
                ))}
            </div>

        </AuthenticatedLayout>
    );
}
