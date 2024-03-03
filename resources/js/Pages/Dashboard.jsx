import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useState} from "react";

export default function Dashboard({auth, orders, products}) {
    const [ordersList, setOrdersList] = useState(orders);
    const [productsList, setProductsList] = useState(products);

    console.log(productsList);
    // Function to parse product ids from string and return corresponding products
    const getProductsByIds = (ids) => {
        const productIds = ids.split(',').map(id => parseInt(id.trim())); // Parse and split product ids
        return productIds.map(id => productsList.find(product => product.id === id)); // Find corresponding products
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
                justifyContent: 'center'
            }}>
                {ordersList.map(order => (
                    <div key={order.id} style={{
                        boxShadow: 'rgb(0 0 0) 0px 0px 8px -4px',
                        borderRadius: '10px',
                        width: '25vw',
                        padding: '10px',
                        minHeight: '50vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }}>
                        <p>{order.name} - {order.email} - {order.phone}</p>
                        <p>{order.comment}</p>

                        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '50px'}}>
                            {/* Display products for this order */}
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
