import React from 'react';
import Header from "@/Pages/Header.jsx";
import {Head, useForm} from '@inertiajs/react';

const Edit = ({product}) => {
    const {data, setData, patch} = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        photos: [],
    });

    // Встановлємо значення полів інпутів за допомогою useState
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setData(name, value);
    };

    // Встановлюємо значення поля із фото
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData('photos', files);
    };

    // Відправляємо дані форми
    const submit = (e) => {
        e.preventDefault();
        patch(route('products.update', product.id));
    };

    return (
        <div>
            <Header/>
            <Head title="Редагувати товар"/>

            <form onSubmit={submit} className="edit_product">
                <div className="product_form">
                    <h1>Редагувати товар</h1>
                    <p>Назва</p>
                    <input type="text" name="name" value={data.name} onChange={handleInputChange}/>
                    <p>Опис</p>
                    <textarea name="description" value={data.description} onChange={handleInputChange}></textarea>
                    <p>Ціна</p>
                    <input type="text" name="price" value={data.price} onChange={handleInputChange}/>
                    <p>Кількість</p>
                    <input type="number" name="quantity" value={data.quantity} onChange={handleInputChange}/>
                    <p>Фото</p>
                    <input type="file" name="photos" multiple accept="image/*" onChange={handleFileChange}
                           style={{marginBottom: '50px', padding: '10px'}}/>

                    {data.photos.length > 0 ?
                        <div id="photoPreviews"
                             style={{marginBottom: '50px', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                            {data.photos.map((file, index) => (
                                <img key={index} src={URL.createObjectURL(file)} style={{maxWidth: '100px'}}/>
                            ))}
                        </div>
                        :
                        <div style={{marginBottom: '50px', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                            {product.photos.map((photo, index) => (
                                <img key={index} src={`/storage/${photo.path}`} alt={`Photo ${index + 1}`}
                                     style={{maxWidth: '100px'}}/>
                            ))}
                        </div>
                    }

                    <input type="submit" value="Зберегти зміни" className='add_to_basket'
                           style={{width: '100%', marginBottom: '50px'}}/>
                </div>
            </form>
        </div>
    );
}

export default Edit;
