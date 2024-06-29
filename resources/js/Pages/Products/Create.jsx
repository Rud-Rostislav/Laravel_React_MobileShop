import React from 'react';
import Header from "@/Components/Header.jsx";
import {Head, useForm} from '@inertiajs/react';

const Create = () => {
    const {data, setData, post, errors} = useForm({
        name: '',
        description: '',
        price: '',
        quantity: '',
        photos: [],
    });

    // Відправляємо дані форми
    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <div>
            <Header/>
            <Head title="Додати товар"/>

            <form onSubmit={submit} className="add_product">
                <div className="product_form">
                    <h1 style={{fontSize: '1.5rem'}}>Додати новий товар</h1>
                    <p>Назва</p>
                    <input type="text" name="name" value={data.name} onChange={e => setData('name', e.target.value)}/>
                    {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                    <p>Опис</p>
                    <textarea name="description" value={data.description}
                              onChange={e => setData('description', e.target.value)}></textarea>
                    {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}
                    <p>Ціна</p>
                    <input type="text" name="price" value={data.price}
                           onChange={e => setData('price', e.target.value)}/>
                    {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                    <p>Кількість</p>
                    <input type="number" name="quantity" value={data.quantity}
                           onChange={e => setData('quantity', e.target.value)}/>
                    {errors.quantity && <p style={{color: 'red'}}>{errors.quantity}</p>}

                    <p>Фото</p>
                    <input type="file" name="photos" multiple accept="image/*"
                           onChange={e => setData('photos', Array.from(e.target.files))}
                           style={{marginBottom: '50px', padding: '10px'}}/>
                    {errors.photos && <p style={{color: 'red'}}>{errors.photos}</p>}

                    {data.photos.length > 0 &&
                        <div style={{marginBottom: '50px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyItems: 'center', gap: '10px'}}>
                            {data.photos.map((file, index) => (
                                <img key={index} src={URL.createObjectURL(file)}/>
                            ))}
                        </div>
                    }

                    <input type="submit" className='add_to_basket' value="Додати товар"
                           style={{marginBottom: '50px', width: '100%'}}/>
                </div>
            </form>
        </div>
    );
}

export default Create;
