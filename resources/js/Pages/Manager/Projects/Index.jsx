import {useState} from "react";
import {Head, router, useForm} from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Footer from "@/Components/Footer.jsx";
import Edit from "@/Pages/Manager/Projects/Edit.jsx";
import EditTask from "@/Pages/Manager/Tasks/Edit.jsx";

export default function Index(props) {
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
        window.location.reload()
    }

    const {data, setData, post} = useForm({
        name: '',
        description: '',
        project_id: '',
    });

    const [tasks] = useState(props.tasks || []);
    let tasksLengths = tasks.length ? tasks[tasks.length - 1].id : 0;

    const createTask = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
        window.location.reload()
    };

    const addTask = (e, id) => {
        const projectIndex = projects.findIndex(p => p.id === id);
        projects[projectIndex].tasks = [...projects[projectIndex].tasks, {
            id: tasksLengths + 1,
            name: data.name,
            description: data.description,
            project_id: id,
            completed: false
        }];
        setProjects([...projects]);
        tasksLengths++;
        setData('project_id', id);
    };

    const [editProjectName, setEditProjectName] = useState(null);
    const [editTask, setEditTask] = useState(null);

    const updateProjectName = (id, newName) => {
        const updatedProjects = projects.map(project =>
            project.id === id ? {...project, name: newName} : project
        );
        setProjects(updatedProjects);
    };

    const deleteProject = (id) => {
        const updatedProjects = projects.filter(project => project.id !== id);
        setProjects(updatedProjects);
    };

    return (
        <div>
            <Head title="Менеджер проектів"/>
            <Header/>
            <main className='main_project_task'>

                <form onSubmit={createProject} className='add_product create_project'>
                    <input type="text" name='name' onChange={e => setProject({name: e.target.value})}
                           placeholder="Назва"/>
                    <button type="submit" className='black_button'>Створити проект
                    </button>
                </form>

                {projects.length ? projects.map((project) => (
                        <div className="project" key={project.id}>
                            {editProjectName !== project.id
                                ?
                                <button onClick={() => setEditProjectName(project.id)}
                                        className='project_header'>{project.name}</button>
                                : <Edit project={project} setEditProjectName={setEditProjectName}
                                        updateProjectName={updateProjectName} deleteProject={deleteProject}/>
                            }

                            {project.tasks.map((task) => (
                                <div key={task.id}>
                                    {editTask !== task.id ?
                                        <div onClick={() => setEditTask(task.id)} className='rows'>
                                            <p className='capitalize-text task-name'>{task.name.slice(0, 50)}</p>
                                            <p className='capitalize-text'>{task.description.slice(0, 75)}</p>
                                            <p className={task.completed
                                                ? 'green'
                                                : 'red'}>
                                                {task.completed ? 'Виконано' : 'У виконанні'}</p>
                                        </div>
                                        :
                                        <EditTask task={task} setEditTask={setEditTask}/>
                                    }
                                </div>
                            ))}

                            <form className='rows form_input' onSubmit={createTask}>
                                <input type="text" name="name"
                                       onChange={e => setData('name', e.target.value)}
                                       placeholder="Назва задачі" className='task_input'/>

                                <input type="text" name="description" onChange={e => setData('description', e.target.value)}
                                       placeholder="Опис задачі" className='task_input'/>

                                <input type="hidden" name="project_id" value={project.id}/>

                                <button type="submit" onClick={e => addTask(e, project.id)} className='task_input'>Додати
                                </button>
                            </form>
                        </div>
                    ))
                    : null
                }

            </main>
            <Footer/>
        </div>
    )
}
