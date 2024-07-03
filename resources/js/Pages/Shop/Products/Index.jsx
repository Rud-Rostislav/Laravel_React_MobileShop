import React, {useState} from 'react';
import Header from "@/Components/Header.jsx";
import {Head, Link} from '@inertiajs/react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from "@/Pages/Shop/Basket/Add.jsx";
import Footer from "@/Components/Footer.jsx";

const Index = ({products, basket}) => {
    const [productsList] = useState(products);
    const [basketQuantity, setBasketQuantity] = useState(basket.length);

    return (
        <>
            <Header basketQuantity={basketQuantity}/>
            <Head title="Всі товари"/>

            <main>
                <ToastContainer/>
                <h1>Всі товари</h1>

                <div className="products">
                    {productsList.map((product) => (
                        <div className="product" key={product.id}>

                            <Link className="product_link" href={route('products.show', product.id)}>
                                <p className="product_name">{product.name}</p>

                                {product.photos && product.photos.length > 0 ?
                                    <img className='image_index' src={`/storage/${product.photos[0].path}`}
                                         alt="Product image"/>
                                    : <p className='empty_image'></p>
                                }
                            </Link>

                            <div className='product_button'>
                                {product.quantity > 0
                                    ? <Add product={product} basketQuantity={basketQuantity} setBasketQuantity={setBasketQuantity}/>
                                    : <button className='black_button no_product'>Немає в наявності</button>
                                }
                            </div>

                        </div>
                    ))}
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default Index;
