import {useRef, useState} from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import {useForm} from '@inertiajs/react';

export default function DeleteUserForm({className = ''}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>

            <DangerButton onClick={confirmUserDeletion}>Видалити акаунт НАЗАВЖДИ</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 flex flex-col justify-center gap-2">
                    <h2 className="text-lg font-medium text-white-900">
                        Ви впевнені, що хочете видалити свій обліковий запис?
                    </h2>

                    <p className="mt-1 text-sm text-white-600">
                        Після видалення облікового запису всі дані буде остаточно видалено. Введіть пароль, якщо ви
                        хочете остаточно видалити обліковий запис.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only"/>

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full"
                            isFocused
                            placeholder="Пароль"
                        />

                        <InputError message={errors.password} className="mt-2"/>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <SecondaryButton onClick={closeModal}>Відмінити</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Видалити
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
