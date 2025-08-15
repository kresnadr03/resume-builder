<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index(Request $request)
    {
        return Experience::where('user_id', $request->user()->id)
            ->latest('start_date')
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'company'     => 'required|string|max:150',
            'role'        => 'required|string|max:150',
            'start_date'  => 'nullable|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $data['user_id'] = $request->user()->id;
        return Experience::create($data);
    }

    public function show(Request $request, Experience $experience)
    {
        $this->authorizeOwner($request, $experience);
        return $experience;
    }

    public function update(Request $request, Experience $experience)
    {
        $this->authorizeOwner($request, $experience);

        $data = $request->validate([
            'company'     => 'sometimes|string|max:150',
            'role'        => 'sometimes|string|max:150',
            'start_date'  => 'sometimes|nullable|date',
            'end_date'    => 'sometimes|nullable|date|after_or_equal:start_date',
            'description' => 'sometimes|nullable|string',
        ]);

        $experience->update($data);
        return $experience->refresh();
    }

    public function destroy(Request $request, Experience $experience)
    {
        $this->authorizeOwner($request, $experience);
        $experience->delete();
        return response()->noContent();
    }

    private function authorizeOwner(Request $request, Experience $experience)
    {
        abort_unless($experience->user_id === $request->user()->id, 403, 'Forbidden');
    }
}
