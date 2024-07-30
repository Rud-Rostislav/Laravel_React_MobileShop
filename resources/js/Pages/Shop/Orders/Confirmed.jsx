import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';
import React, {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Confirmed({auth, orders, products}) {
    const [ordersList] = useState(orders);
    const [productsList] = useState(products);
    const [openOrders, setOpenOrders] = useState({});

    const getProductsByIds = (ids) => {
        const productIds = ids.split(',').map(id => parseInt(id.trim()));
        return productIds.map(id => productsList.find(product => product.id === id));
    }

    const notConfirmOrder = () => {
        setTimeout(() => window.location.reload(), 100);
    };

    function toggleProducts(orderId) {
        setOpenOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Кабінет"/>

            <h1>Кількість архівних замовлень: {ordersList.filter(order => order.confirmed).length}</h1>

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
                                Загально ({order.products_id.split(',').length})
                                - {getProductsByIds(order.products_id).reduce((total, product) => total + (product?.price ?? 0), 0)} грн.
                            </p>
                            <Dropdown.Link as="button" href={route('order.destroy', order.id)}
                                           method="delete" className='black_button red'
                                           onClick={notConfirmOrder}>Видалити</Dropdown.Link>

                            <Dropdown.Link as="button" href={route('order.notConfirm', order)} method='patch'
                                           className='black_button red' onClick={notConfirmOrder}>Повернути</Dropdown.Link>
                        </div>

                        {openOrders[order.id] &&
                            <div className='order'>
                                {getProductsByIds(order.products_id).map((product, index) => (
                                    <Link href={route('products.show', product)} key={`${product?.id}_${index}`}
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
