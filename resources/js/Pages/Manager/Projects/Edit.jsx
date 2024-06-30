import {useForm} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Edit({project, setEditProjectName, updateProjectName}) {
    const {data, setData, patch} = useForm({
        name: project.name,
    });

    const submit = async (e) => {
        e.preventDefault();
        await patch(route("projects.update", project.id), {
            onSuccess: () => {
                updateProjectName(project.id, data.name);
                setEditProjectName(null);
            }
        });
    };

    return (
        <>
            <form onSubmit={submit} className="project_edit_name">
                <input
                    type="text"
                    className="project_edit_name_input"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Назва проєкту"
                />
                <button type="submit" className="black_button green project_edit_name_input">
                    Зберегти назву
                </button>
                <Dropdown.Link
                    as="button"
                    href={route("projects.destroy", project.id)}
                    className="black_button red project_edit_name_input"
                    method="delete"
                >
                    Видалити проєкт
                </Dropdown.Link>
            </form>
        </>
    );
}
