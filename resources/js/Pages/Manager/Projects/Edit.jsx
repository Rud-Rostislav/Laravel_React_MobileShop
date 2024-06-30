import {router, useForm} from "@inertiajs/react";

export default function Edit({project, setEditProjectName, updateProjectName, deleteProject}) {
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

    const handleDelete = async (e) => {
        e.preventDefault();
        await router.delete(route("projects.destroy", project.id), {
            onSuccess: () => {
                deleteProject(project.id);
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
                <button onClick={handleDelete} className="black_button red project_edit_name_input">
                    Видалити проєкт
                </button>
            </form>
        </>
    );
}
