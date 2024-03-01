import React, {useState} from 'react';
import Header from "@/Pages/Header.jsx";
import {Head, Link} from '@inertiajs/react';

const Index = ({products}) => {
    const [productsList] = useState(products);

    return (
        <div>
            <Header/>
            <Head title="Всі товари"/>

            <h1>Всі товари</h1>

            <div className="products">
                {productsList.map((product) => (
                    <div className="product" key={product.id}>
                        <h3>{product.name}</h3>

                        {product.photos && product.photos.length > 0 &&
                            <img src={`storage/${product.photos[0].path}`} alt="Product image"/>
                        }

                        <p>Ціна: {product.price} грн</p>

                        <Link href={route('products.show', product.id)} className="more_info">Детальніше</Link>

                        {product.quantity > 0 ? <a href="" className="add_to_basket">Додати у корзину</a>
                            : <p className="out_of_stock">Немає в наявності</p>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
