import React, {useState} from 'react';
import Header from "@/Components/Header.jsx";
import {Head, useForm} from '@inertiajs/react';
import Footer from "@/Components/Footer.jsx";

const Edit = ({product, categories}) => {
    const {data, setData} = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        photos: product.photos.map(photo => ({id: photo.id, file: null, path: photo.path})),
        category_id: product.category_id,
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
        formData.append('category_id', data.category_id);

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
            <main className='main_create'>

                <form onSubmit={submit} className="edit_product">
                    <input placeholder='Назва' type="text" name="name" value={data.name}
                           onChange={e => setData('name', e.target.value)}/>

                    <textarea placeholder='Опис' name="description" value={data.description}
                              onChange={e => setData('description', e.target.value)}></textarea>

                    <input placeholder='Ціна' type="text" name="price" value={data.price}
                           onChange={e => setData('price', e.target.value)}/>

                    <input placeholder='Кількість' type="number" name="quantity" min='0' value={data.quantity}
                           onChange={e => setData('quantity', e.target.value)}/>

                    <select name="category_id" value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}>
                        {categories.find((category) => category.id === data.category_id) && (
                            <option
                                value={data.category_id}>{categories.find((category) => category.id === data.category_id).name}</option>
                        )}
                        {categories.map((category) => category.id !== data.category_id && (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <input type="file" name="photos" multiple accept="image/*"
                           onChange={e => setData('photos', [...data.photos, ...Array.from(e.target.files).map(file => ({
                               id: null,
                               file,
                               path: null
                           }))])}/>

                    {data.photos.length > 0 &&
                        <div id="photoPreviews" className='add_product_image_container'>
                            {data.photos.map((photo, index) => (
                                <div key={index} className='edit_product_photos'>
                                    {photo.path && <img src={`/storage/${photo.path}`}
                                                        alt={`Photo ${index + 1}`}
                                    />}
                                    {photo.file && !photo.path &&
                                        <img src={URL.createObjectURL(photo.file)}
                                             alt={`Photo ${index + 1}`}
                                        />}
                                    <button className='remove_photo_button' type="button"
                                            onClick={() => removePhoto(photo.id)}>X
                                    </button>
                                </div>
                            ))}
                        </div>
                    }

                    <input type="submit" value="Редагувати" className='add_to_basket'/>
                </form>

            </main>
            <Footer/>
        </div>
    );
}

export default Edit;
