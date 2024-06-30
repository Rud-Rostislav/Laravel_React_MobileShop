<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Manager/Projects/Index', [
            'projects' => Project::all()->load('tasks'),
            'tasks' => Task::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|unique:projects|max:255'
        ]);

        Project::create($validate);
        return to_route('projects.index');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Manager/Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validate = $request->validate([
            'name' => 'required|max:255'
        ]);

        $project->update($validate);
        return to_route('projects.index');
    }

    public function destroy(Project $project)
    {
        $project->tasks()->delete();
        $project->delete();
        return to_route('projects.index');
    }

}
