import React, {useState} from 'react';
import Header from "@/Components/Header.jsx";
import {Head, useForm} from '@inertiajs/react';

const Edit = ({product}) => {
    const {data, setData, patch} = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        photos: product.photos.map(photo => ({id: photo.id, file: null, path: photo.path})),
    });

    const [deletedPhotos, setDeletedPhotos] = useState([]);

    const removePhoto = (photoId) => {
        setDeletedPhotos([...deletedPhotos, photoId]);
        setData('photos', data.photos.filter(photo => photo.id !== photoId));
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);

        data.photos.forEach((photo) => {
            if (photo.file) {
                formData.append('photos[]', photo.file);
            }
        });

        deletedPhotos.forEach((photoId) => {
            formData.append('deleted_photos[]', photoId);
        });

        formData.append('_method', 'PATCH');

        fetch(route('products.update', product), {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        }).then(response => {
            if (response.ok) {
                window.location.href = route('products.show', product);
            }
        });
    };

    return (
        <div>
            <Header/>
            <Head title="Редагувати товар"/>

            <form onSubmit={submit} className="edit_product">
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
                <input type="number" name="quantity" min='0' value={data.quantity}
                       onChange={e => setData('quantity', e.target.value)}/>
                <p>Фото</p>
                <input type="file" name="photos" multiple accept="image/*"
                       onChange={e => setData('photos', [...data.photos, ...Array.from(e.target.files).map(file => ({
                           id: null,
                           file,
                           path: null
                       }))])}/>

                <div id="photoPreviews">
                    {data.photos.map((photo, index) => (
                        <div key={index}>
                            {photo.path && <img src={`/storage/${photo.path}`} alt={`Photo ${index + 1}`}
                            />}
                            {photo.file && !photo.path &&
                                <img src={URL.createObjectURL(photo.file)} alt={`Photo ${index + 1}`}
                                />}
                            <button type="button" onClick={() => removePhoto(photo.id)}>X</button>
                        </div>
                    ))}
                </div>


                <input type="submit" value="Зберегти зміни" className='add_to_basket'
                       style={{width: '100%', marginBottom: '50px'}}/>
            </form>
        </div>
    );
}

export default Edit;
