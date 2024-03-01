import React from 'react';
import Header from "@/Pages/Header.jsx";
import {Head, useForm} from '@inertiajs/react';

const Create = () => {
    const {data, setData, post, errors} = useForm({
        name: '',
        description: '',
        price: '',
        quantity: '',
        photos: [],
    });

    // Встановлюємо значення полів інпутів за допомогою useState
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
                    <input type="text" name="name" value={data.name} onChange={handleInputChange}/>
                    {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                    <p>Опис</p>
                    <textarea name="description" value={data.description} onChange={handleInputChange}></textarea>
                    {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}
                    <p>Ціна</p>
                    <input type="text" name="price" value={data.price} onChange={handleInputChange}/>
                    {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                    <p>Кількість</p>
                    <input type="number" name="quantity" value={data.quantity} onChange={handleInputChange}/>
                    {errors.quantity && <p style={{color: 'red'}}>{errors.quantity}</p>}
                    <p>Фото</p>
                    <input type="file" name="photos" multiple accept="image/*" onChange={handleFileChange}
                           style={{marginBottom: '50px', padding: '10px'}}/>
                    {errors.photos && <p style={{color: 'red'}}>{errors.photos}</p>}

                    {data.photos.length > 0 &&
                        <div id="photoPreviews"
                             style={{marginBottom: '50px', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                            {data.photos.map((file, index) => (
                                <img key={index} src={URL.createObjectURL(file)} style={{maxWidth: '150px'}}/>
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
