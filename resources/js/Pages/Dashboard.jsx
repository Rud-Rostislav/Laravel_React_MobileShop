import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Dashboard({auth, orders, products}) {
    const [ordersList, setOrdersList] = useState(orders);
    const [productsList] = useState(products);

    const getProductsByIds = (ids) => {
        const productIds = ids.split(',').map(id => parseInt(id.trim()));
        return productIds.map(id => productsList.find(product => product.id === id));
    }

    const handleDeleteOrder = (id) => {
        setOrdersList(ordersList.filter(order => order.id !== id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Кабінет"/>

            <h1>Кількість замовлень: {ordersList.length}</h1>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '25px',
                padding: '5vh 0',
                justifyContent: 'center',
            }}>
                {ordersList.map(order => (
                    <div key={order.id} style={{
                        boxShadow: 'rgb(0 0 0) 0px 0px 8px -4px',
                        borderRadius: '10px',
                        width: '25vw',
                        padding: '10px',
                        minHeight: '75vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        position: 'relative',
                    }}>

                        <Dropdown.Link as="button" onClick={() => handleDeleteOrder(order.id)}
                                       href={route('order.destroy', order.id)}
                                       method="delete" style={{
                            width: '50px',
                            height: '50px',
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '5px',
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>X</Dropdown.Link>

                        <p>Загально до сплати: {getProductsByIds(order.products_id).reduce((total, product) => total + product.price, 0)}</p>
                        <p>{order.name} - {order.email} - {order.phone}</p>
                        <p>{order.comment}</p>

                        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '50px'}}>
                            {getProductsByIds(order.products_id).map(product => (
                                <div key={product.id} style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                    {product.photos && product.photos.length > 0 &&
                                        <img src={`storage/${product.photos[0].path}`} alt="Product image"
                                             style={{width: '5vw'}}/>
                                    }
                                    <p>{product.name} - {product.price} </p>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
