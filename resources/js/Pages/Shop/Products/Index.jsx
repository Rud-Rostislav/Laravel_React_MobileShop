import React, {useState} from 'react';
import Header from "@/Components/Header.jsx";
import {Head, Link} from '@inertiajs/react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from "@/Pages/Shop/Basket/Add.jsx";
import Footer from "@/Components/Footer.jsx";

const Index = ({products, allProducts, basket}) => {
    const [productsList] = useState(products.data);
    const [basketQuantity, setBasketQuantity] = useState(basket.length);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = searchQuery === ''
        ? productsList
        : allProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <Header basketQuantity={basketQuantity}/>
            <Head title="Всі товари"/>

            <main>
                <ToastContainer/>
                <h1>Всі товари</h1>

                <form onSubmit={(e) => e.preventDefault()} className='search'>
                    <input type="text" value={searchQuery} placeholder="Пошук" onChange={handleSearch}/>
                </form>

                <div className="products">
                    {filteredProducts.map((product) => (
                        <div className="product" key={product.id}>

                            <Link className="product_link" href={route('products.show', product.id)}>
                                {product.photos && product.photos.length > 0
                                    ? <img src={`/storage/${product.photos[0].path}`}
                                           alt="Product image"/>
                                    : <img src='/images/empty_image.png' alt="Empty image"/>
                                }
                                <p className="product_name">{product.name}</p>
                            </Link>

                            <div className='product_button'>
                                {product.quantity > 0
                                    ? <Add product={product} basketQuantity={basketQuantity}
                                           setBasketQuantity={setBasketQuantity}/>
                                    : <button className='black_button no_product'>Немає в наявності</button>
                                }
                            </div>

                        </div>
                    ))}
                </div>

                {!searchQuery &&
                    <div className='prev_next_container'>
                        {products.prev_page_url ?
                            <Link href={products.prev_page_url}><span>&lt;</span></Link>
                            : <span className='empty_prev_next_buttons'>&lt;</span>
                        }

                        <p>{products.current_page} / {products.last_page}</p>

                        {products.next_page_url ?
                            <Link href={products.next_page_url}>></Link>
                            : <span className='empty_prev_next_buttons'>></span>
                        }
                    </div>
                }

            </main>
            <Footer/>
        </>
    );
}

export default Index;
