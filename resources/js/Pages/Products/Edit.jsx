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

    // Відправляємо дані форми
// Відправляємо дані форми
    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        data.photos.forEach((photo) => {
            formData.append('photos[]', photo);
        });
        formData.append('_method', 'PATCH'); // Додайте це, щоб Laravel розпізнавав PATCH-запит
        fetch(route('products.update', product), {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        }).then(response => {
            if (response.ok) {
                // Redirect or do something else upon successful update
                window.location.href = route('products.show', product);
            } else {
                // Handle errors
                // You can display an error message or handle errors accordingly
            }
        }).catch(error => {
            // Handle network errors
            console.error('Error occurred:', error);
        });
    };


    return (
        <div>
            <Header/>
            <Head title="Редагувати товар"/>

            <form onSubmit={submit} className="edit_product">
                <div className="product_form">
                    <h1>Редагувати товар</h1>
                    <p>Назва</p>
                    <input type="text" name="name" value={data.name} onChange={e => setData('name', e.target.value)}/>
                    <p>Опис</p>
                    <textarea name="description" value={data.description}
                              onChange={e => setData('description', e.target.value)}></textarea>
                    <p>Ціна</p>
                    <input type="text" name="price" value={data.price}
                           onChange={e => setData('price', e.target.value)}/>
                    <p>Кількість</p>
                    <input type="number" name="quantity" value={data.quantity}
                           onChange={e => setData('quantity', e.target.value)}/>
                    <p>Фото (чомусь не працює)</p>

                    <input type="file" name="photos" multiple accept="image/*"
                           onChange={e => setData('photos', Array.from(e.target.files))}
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
