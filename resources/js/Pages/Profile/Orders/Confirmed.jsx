import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';
import {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Confirmed({auth, orders, products}) {
    const [ordersList, setOrdersList] = useState(orders);
    const [productsList] = useState(products);

    const getProductsByIds = (ids) => {
        const productIds = ids.split(',').map(id => parseInt(id.trim()));
        return productIds.map(id => productsList.find(product => product.id === id));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Кабінет"/>

            <h1>Кількість архівних замовлень: {ordersList.filter(order => order.confirmed).length}</h1>

            <div className='orders'>
                {ordersList.filter(order => order.confirmed).map(order => (
                    <div className='order order_confirmed' key={order.id}>
                        <p>{order.name}</p>
                        <p>{order.email} - {order.phone}</p>
                        <p>Коментар: {order.comment.length > 0 ? order.comment : ''}</p>

                        <p>
                            Загально ({order.products_id.split(',').length}) до
                            сплати: {getProductsByIds(order.products_id).reduce((total, product) => total + (product?.price ?? 0), 0)} грн.
                        </p>

                        <Dropdown.Link as="button" href={route('order.destroy', order.id)}
                                       method="delete" className='add_to_basket error'>Видалити</Dropdown.Link>

                        <Dropdown.Link as="button" href={route('order.notConfirm', order)} method='patch'
                                       className='add_to_basket error'>Не виконано</Dropdown.Link>

                        {getProductsByIds(order.products_id).map((product, index) => (
                            <div key={`${product?.id}_${index}`}
                                 className='order_product'>
                                {product?.photos && product.photos.length > 0 &&
                                    <img src={`/storage/${product.photos[0].path}`} alt="Product image"
                                         className='order_product_image'/>
                                }
                                <p>{product?.name}</p>
                                <p>{product?.price} грн</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

        </AuthenticatedLayout>
    );
}
