import {useForm} from "@inertiajs/react";
import {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Edit(props) {
    const [task] = useState(props.task);

    const {data, setData, patch} = useForm({
        name: task.name,
        description: task.description,
        completed: task.completed,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('tasks.update', task.id), {
            onSuccess: () => window.location.reload(),
        });
    };

    return (
        <>
            <form onSubmit={submit} className='task_edit_rows'>
                <input className='task_edit_input' type="text" name="name" value={data.name}
                       onChange={e => setData('name', e.target.value)}
                       placeholder="Назва задачі"/>

                <input className='task_edit_input task_edit_input_top_border' type="text"
                       name="description" value={data.description}
                       onChange={e => setData('description', e.target.value)}
                       placeholder="Опис задачі"/>

                <select className='task_edit_input task_edit_input_left_border' name="completed"
                        value={data.completed} onChange={e => setData('completed', e.target.value)}>
                    <option value='0'>У виконанні</option>
                    <option value='1'>Виконано</option>
                </select>

                <button type="submit" className='green task_edit_input_right_border task_edit_buttons'>Оновити
                    задачу
                </button>

                <Dropdown.Link onClick={() => window.location.reload()} className="red black_button task_edit_buttons" as="button"
                               href={route('tasks.destroy', task.id)}
                               method="delete">Видалити задачу</Dropdown.Link>

                <button className='red task_edit_input_left_border task_edit_buttons'
                        onClick={() => props.setEditTask(false)}>Приховати
                    редагування
                </button>

            </form>
        </>
    );
}
