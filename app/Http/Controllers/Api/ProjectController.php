<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        return Project::where('user_id', $request->user()->id)
            ->latest('created_at')
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:150',
            'description' => 'nullable|string',
            'image'       => 'nullable|string|max:255', // simpan path/url dari endpoint upload
            'link'        => 'nullable|url|max:255',
        ]);

        $data['user_id'] = $request->user()->id;
        return Project::create($data);
    }

    public function show(Request $request, Project $project)
    {
        $this->authorizeOwner($request, $project);
        return $project;
    }

    public function update(Request $request, Project $project)
    {
        $this->authorizeOwner($request, $project);

        $data = $request->validate([
            'title'       => 'sometimes|string|max:150',
            'description' => 'sometimes|nullable|string',
            'image'       => 'sometimes|nullable|string|max:255',
            'link'        => 'sometimes|nullable|url|max:255',
        ]);

        $project->update($data);
        return $project->refresh();
    }

    public function destroy(Request $request, Project $project)
    {
        $this->authorizeOwner($request, $project);
        $project->delete();
        return response()->noContent();
    }

    private function authorizeOwner(Request $request, Project $project)
    {
        abort_unless($project->user_id === $request->user()->id, 403, 'Forbidden');
    }
}
