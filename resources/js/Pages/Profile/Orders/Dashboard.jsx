import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Кабінет"/>

            <h1>Кількість замовлень: {ordersList.length}</h1>

            <Link href={route('order.deleted')}>Видалені замовлення</Link>

            {ordersList.map(order => (
                <div style={{
                    boxShadow: 'rgb(0 0 0) 0px 0px 8px -4px',
                    borderRadius: '10px',
                    width: '75vw',
                    minHeight: '15vh',
                    padding: '50px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    justifyItems: 'center',
                    alignItems: 'center',
                    margin: '25px auto',
                }} key={order.id}>

                    <p>{order.name} | {order.email} | {order.phone}</p>
                    <p>Коментар: {order.comment.length > 0 ? order.comment : ''}</p>
                    <p>Загально ({order.products_id.split(',').length}) до
                        сплати: {getProductsByIds(order.products_id).reduce((total, product) => total + product.price, 0)}</p>

                    <Dropdown.Link as="button" onClick={() => handleDeleteOrder(order.id)}
                                   href={route('order.destroy', order.id)}
                                   method="delete" style={{
                        width: '80%',
                        color: 'white',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>Видалити замовлення</Dropdown.Link>


                    {getProductsByIds(order.products_id).map(product => (
                        <Link href={route('products.show', product.id)} key={product.id}
                              style={{
                                  marginTop: '50px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '10px',
                                  alignItems: 'center',
                                  boxShadow: 'rgb(0 0 0) 0px 0px 8px -2px',
                                  padding: '10px',
                                  borderRadius: '10px',
                              }}>
                            {product.photos && product.photos.length > 0 &&
                                <img src={`storage/${product.photos[0].path}`} alt="Product image"
                                     style={{width: '100px'}}/>
                            }
                            <p>{product.name} - {product.price} </p>
                        </Link>
                    ))}
                </div>
            ))}
        </AuthenticatedLayout>
    );
}
