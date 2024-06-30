import {Link, useForm} from "@inertiajs/react";
import {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";

export default function Create(props) {
    const [project] = useState(props.project);
    const {data, setData, patch} = useForm({
        name: project.name,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('projects.update', project.id));
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
                fontSize: '1.25rem',
                height: '5vh'
            }}><Link href={route('projects.index')}>Projects</Link>
            </nav>

            <form onSubmit={submit}
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '1rem',
                      alignItems: 'center',
                      height: '95vh',
                  }}>

                <h1 style={{textAlign: 'center', fontSize: '2rem'}}>Edit {project.name}</h1>

                <input type="text" name='name' value={data.name} onChange={(e) => setData('name', e.target.value)}
                       placeholder="Project name"/>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>

                    <button type="submit"
                            style={{
                                fontSize: '1.25rem', border: '1px solid black',
                                borderRadius: '5px'
                            }}>Edit
                    </button>

                    <Dropdown.Link className="dropdown-link" as="button" href={route('projects.destroy', project.id)}
                                   method="delete"
                                   style={{
                                       color: 'red',
                                       fontSize: '1.25rem',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       border: '1px solid black',
                                       borderRadius: '5px',
                                   }}>
                        Delete
                    </Dropdown.Link>

                </div>
            </form>
        </>
    )
}
