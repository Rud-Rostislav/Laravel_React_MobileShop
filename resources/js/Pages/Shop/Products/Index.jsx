import React, {useState} from 'react';
import Header from "@/Components/Header.jsx";
import {Head, Link} from '@inertiajs/react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from "@/Pages/Shop/Basket/Add.jsx";
import Footer from "@/Components/Footer.jsx";

const Index = ({products, allProducts, basket, categories}) => {
    const [productsList] = useState(products.data);
    const [basketQuantity, setBasketQuantity] = useState(basket.length);
    const [searchName, setSearchName] = useState('');
    const [searchMaxPrice, setSearchMaxPrice] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (searchName === '' && searchCategory === '' && searchMaxPrice === '') {
            setSearch('');
        } else {
            setSearch({name: searchName, category: searchCategory, maxPrice: searchMaxPrice});
        }
    };

    const filteredProducts = search === ''
        ? productsList
        : Array.isArray(search) || typeof search === 'string'
            ? productsList
            : allProducts.filter((product) => {
                const nameMatch = search.name === '' || product.name.toLowerCase().includes(search.name.toLowerCase());
                const categoryMatch = search.category === '' || product.category_id === parseInt(search.category);
                const maxPriceMatch = search.maxPrice === '' || product.price <= parseInt(search.maxPrice);
                return nameMatch && categoryMatch && maxPriceMatch;
            });

    return (
        <>
            <Header basketQuantity={basketQuantity}/>
            <Head title="Всі товари"/>

            <main>
                <ToastContainer/>

                <div className="search_box">
                    <input type="text" value={searchName} placeholder="Назва"
                           onChange={e => setSearchName(e.target.value)}/>

                    <select name="category" value={searchCategory}
                            onChange={e => setSearchCategory(e.target.value)}>
                        <option>Категорія</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>

                    <div className='search_price_div'>
                        <p>Максимальна ціна: {searchMaxPrice}</p>
                        <input name='price' type="range" min={0} max={100000} step={1000} value={searchMaxPrice}
                               placeholder="Максимальна ціна"
                               onChange={e => setSearchMaxPrice(e.target.value)}/>
                    </div>

                    <button onClick={handleSearch}>Пошук</button>
                    <button
                        onClick={() => (setSearch(''), setSearchName(''), setSearchCategory(''), setSearchMaxPrice(''))}>
                        Показати все
                    </button>
                </div>

                <div className="products">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
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
                        ))
                    ) : (
                        <p className="no_products_message">Немає співпадінь за пошуковим запитом</p>
                    )}
                </div>

                {!search &&
                    <div className='prev_next_container'>
                        {products.prev_page_url
                            ? <Link href={products.prev_page_url}>&lt;</Link>
                            : <p className='empty_prev_next_buttons'>&lt;</p>
                        }

                        <p>{products.current_page} - {products.last_page}</p>

                        {products.next_page_url
                            ? <Link href={products.next_page_url}>&gt;</Link>
                            : <p className='empty_prev_next_buttons'>&gt;</p>
                        }
                    </div>
                }

            </main>
            <Footer/>
        </>
    );
}

export default Index;
