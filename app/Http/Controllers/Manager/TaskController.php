<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'project_id' => 'required',
        ]);

        Task::create($validate);
        return redirect()->route('projects.index');
    }

    public function update(Request $request, Task $task)
    {
        $validate = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'completed' => 'required',
        ]);

        $task->completed = $validate['completed'];

        $task->update($validate);
        return redirect()->route('projects.index');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->route('projects.index');
    }
}
