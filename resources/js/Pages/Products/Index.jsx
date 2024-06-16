import React, {useState} from 'react';
import Header from "@/Components/Header.jsx";
import {Head, Link} from '@inertiajs/react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from "@/Pages/Basket/Add.jsx";

const Index = ({products}) => {
    const [productsList] = useState(products);

    return (
        <div>
            <Header/>
            <Head title="Всі товари"/>
            <ToastContainer/>

            <h1>Всі товари</h1>

            <div className="products">
                {productsList.map((product) => (
                    <div className="product" key={product.id} style={{justifyContent: product.photos ? 'space-evenly' : 'center'}}>
                        <h2 style={{fontSize: '2rem'}}>{product.name}</h2>

                        {product.photos && product.photos.length > 0 &&
                            <img src={`storage/${product.photos[0].path}`} alt="Product image"/>
                        }

                        <p style={{fontSize: '1.2rem'}}>Ціна: {product.price} грн</p>

                        <Link href={route('products.show', product.id)} className="more_info">Детальніше</Link>

                        {product.quantity > 0 ?
                            <Add product={product}/>
                            : <p className="out_of_stock">Немає в наявності</p>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
