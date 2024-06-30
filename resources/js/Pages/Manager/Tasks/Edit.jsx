import {Link, useForm} from "@inertiajs/react";
import {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Create(props) {
    const [task] = useState(props.task);
    const {data, setData, patch, errors} = useForm({
        name: task.name,
        description: task.description,
        completed: task.completed,
        project_id: task.project_id
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('tasks.update', task.id));
    };

    return (
        <>
            <nav style={{
                backgroundColor: '#202020',
                color: 'white',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                fontSize: '1.25rem'
            }}>
                <Link href={route('projects.index')}>Project</Link>
            </nav>

            <form onSubmit={submit} style={{
                display: "flex",
                flexDirection: "column",
                width: "20vw",
                margin: "30vh auto",
                gap: "1rem"
            }}>

                <h1 style={{textAlign: "center", fontSize: "2rem"}}>Edit Task</h1>
                <h2 style={{textAlign: "center", fontSize: "1.5rem"}}>{task.name}</h2>

                <input type="text" name="name" value={data.name} onChange={e => setData('name', e.target.value)}
                       placeholder="Task name"/>
                {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}

                <input type="text" name="description" value={data.description}
                       onChange={e => setData('description', e.target.value)}
                       placeholder="Task description"/>
                {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}

                <select name="completed" value={data.completed} onChange={e => setData('completed', e.target.value)}>
                    <option value='0'>In progress</option>
                    <option value='1'>Done</option>
                </select>

                {errors.completed && <p style={{color: 'red'}}>{errors.completed}</p>}

                <select name="project_id" value={data.project_id} onChange={e => setData('project_id', e.target.value)}>
                    {props.projects.map((project) => (
                        <option value={project.id} key={project.id}>
                            {project.id} - {project.name}
                        </option>
                    ))}
                </select>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>

                    <button type="submit"
                            style={{
                                fontSize: '1.25rem', border: '1px solid black',
                                borderRadius: '10px'
                            }}>Edit
                    </button>

                    <Dropdown.Link className="dropdown-link" as="button" href={route('tasks.destroy', task.id)}
                                   method="delete"
                                   style={{
                                       color: 'red',
                                       fontSize: '1.25rem',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       border: '1px solid black',
                                       borderRadius: '10px',
                                   }}>Delete
                    </Dropdown.Link>

                </div>
            </form>
        </>
    );
}
