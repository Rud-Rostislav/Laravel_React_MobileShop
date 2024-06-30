import {useState} from "react";
import {Head, Link, router, useForm} from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";

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
        const tasks = projects[id - 1].tasks
        tasks.push({
            id: tasksLengths + 1,
            name: data.name,
            description: data.description,
            project_id: id,
            completed: false
        })
        tasksLengths++;
        setTasks(tasks);
        setData('project_id', id);
    };

    return (
        <div>
            <Head title="Projects"/>
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
                        <Link href={route('projects.edit', project.id)} className='project_header'>{project.name}</Link>

                        <div className='rows no_border'>
                            <p>Name</p>
                            <p>Description</p>
                            <p>
                                {project.tasks.length === 0 ? 'No Task' :
                                    project.tasks.filter((task) => task.completed).length === project.tasks.length ? 'All done' :
                                        `Done ${project.tasks.filter((task) => task.completed).length} of ${project.tasks.length}
                                    (${(project.tasks.filter((task) => task.completed).length / project.tasks.length * 100).toFixed(0)}%)`
                                }
                            </p>
                        </div>

                        {project.tasks.map((task) => (
                            <Link href={route('tasks.edit', task.id)} key={task.id} className='rows'>
                                <p className='capitalize-text'>{task.name.slice(0, 50)}</p>
                                <p className='capitalize-text'>{task.description.slice(0, 75)}</p>
                                <p className={task.completed ? 'green' : 'red'}>{task.completed ? 'Виконано' : 'У виконанні'}</p>
                            </Link>
                        ))}

                        <form className='rows no_border form_input' onSubmit={createTask}>
                            <input type="text" name="name"
                                   onChange={e => setData('name', e.target.value)}
                                   placeholder="Назва задачі" className='task_input'/>

                            <input type="text" name="description" onChange={e => setData('description', e.target.value)}
                                   placeholder="Task description" className='task_input'/>

                            <button type="submit" onClick={e => addTask(e, project.id)} className='task_input'>Create
                            </button>
                        </form>
                    </div>
                ))}

            </main>
            <Footer/>
        </div>
    )
}
