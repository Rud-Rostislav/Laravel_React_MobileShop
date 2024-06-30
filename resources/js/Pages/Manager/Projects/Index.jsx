import {useState} from "react";
import {Head, Link, router, useForm} from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import Edit from "@/Pages/Manager/Projects/Edit.jsx";

export default function Index(props) {
    // Projects
    const [projects, setProjects] = useState(props.projects);
    const [project, setProject] = useState({
        name: ''
    });

    const createProject = (e) => {
        e.preventDefault();
        const newProject = {
            id: projects.length ? projects[projects.length - 1].id + 1 : 1,
            name: project.name,
            tasks: []
        }

        setProjects([...projects, newProject]);
        router.post(route('projects.store'), project);
    }

    // Tasks
    const {data, setData, post} = useForm({
        name: '',
        description: '',
        project_id: '',
    });

    const [tasks, setTasks] = useState(props.tasks);
    let tasksLengths = tasks ? tasks[tasks.length - 1].id : 0;

    const createTask = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    const addTask = (e, id) => {
        const projectIndex = projects.findIndex(p => p.id === id);
        const projectTasks = [...projects[projectIndex].tasks, {
            id: tasksLengths + 1,
            name: data.name,
            description: data.description,
            project_id: id,
            completed: false
        }];
        projects[projectIndex].tasks = projectTasks;
        setProjects([...projects]);
        tasksLengths++;
        setData('project_id', id);
    };

    const [editProjectName, setEditProjectName] = useState(null);

    const updateProjectName = (id, newName) => {
        const updatedProjects = projects.map(project =>
            project.id === id ? { ...project, name: newName } : project
        );
        setProjects(updatedProjects);
    };

    return (
        <div>
            <Head title="Менеджер проектів"/>
            <Header/>
            <main className='main_project_task'>

                <form onSubmit={createProject} className='add_product'>
                    <input type="text" name='name' onChange={e => setProject({name: e.target.value})}
                           placeholder="Назва проекту"/>
                    <button type="submit" className='black_button'>Створити проект
                    </button>
                </form>

                {projects.map((project) => (
                    <div className="project" key={project.id}>
                        {editProjectName !== project.id
                            ?
                            <button onClick={() => setEditProjectName(project.id)}
                                    className='project_header'>{project.name}</button>
                            : <Edit project={project} setEditProjectName={setEditProjectName} updateProjectName={updateProjectName}/>
                        }

                        {project.tasks.map((task) => (
                            <Link href={route('tasks.edit', task.id)} key={task.id} className='rows'>
                                <p className='capitalize-text border-right'>{task.name.slice(0, 50)}</p>
                                <p className='capitalize-text'>{task.description.slice(0, 75)}</p>
                                <p className={task.completed
                                    ? 'green border-left remove_background_hover'
                                    : 'red border-left remove_background_hover'}>
                                    {task.completed ? 'Виконано' : 'У виконанні'}</p>
                            </Link>
                        ))}

                        <form className='rows form_input' onSubmit={createTask}>
                            <input type="text" name="name"
                                   onChange={e => setData('name', e.target.value)}
                                   placeholder="Назва задачі" className='task_input'/>

                            <input type="text" name="description" onChange={e => setData('description', e.target.value)}
                                   placeholder="Опис задачі" className='task_input'/>

                            <button type="submit" onClick={e => addTask(e, project.id)} className='task_input'>Додати
                                задачу
                            </button>
                        </form>
                    </div>
                ))}

            </main>
            <Footer/>
        </div>
    )
}
