import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link, useForm} from '@inertiajs/react';
import {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Deleted({auth, orders, products}) {
    const [ordersList, setOrdersList] = useState(orders);
    const [productsList] = useState(products);

    const getProductsByIds = (ids) => {
        const productIds = ids.split(',').map(id => parseInt(id.trim()));
        return productIds.map(id => productsList.find(product => product.id === id));
    }

    /*    const handleDeleteOrder = (id) => {
            setOrdersList(ordersList.filter(order => order.id !== id));
        }*/

    const {data, setData, patch} = useForm({
        name: '',
        email: '',
        phone: '',
        comment: '',
        deleted_at: '',
    })

    const restoreOrder = (e, order) => {
        e.preventDefault();
        patch(route('order.restore', order));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Кабінет"/>

            <h1>Кількість видалених замовлень: {ordersList.length}</h1>

            <Link href={route('dashboard')}>Всі замовлення</Link>

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


                    <form onSubmit={(e) => restoreOrder(e, order)}>
                        <input type="hidden" name="id" value={order.id}/>
                        <input type="text" name={ 'deleted_at'} value={data.deleted_at} onChange={e => setData('deleted_at', e.target.value)}/>
                        <button type="submit" style={{
                            width: '80%',
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>Відновити замовлення</button>
                    </form>

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
