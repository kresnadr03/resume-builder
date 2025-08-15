<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index(Request $request)
    {
        return Skill::where('user_id', $request->user()->id)
            ->orderBy('skill_name')
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'skill_name' => 'required|string|max:120',
            'level'      => 'nullable|in:beginner,intermediate,advanced',
        ]);

        $data['user_id'] = $request->user()->id;
        return Skill::create($data);
    }

    public function show(Request $request, Skill $skill)
    {
        $this->authorizeOwner($request, $skill);
        return $skill;
    }

    public function update(Request $request, Skill $skill)
    {
        $this->authorizeOwner($request, $skill);

        $data = $request->validate([
            'skill_name' => 'sometimes|string|max:120',
            'level'      => 'sometimes|in:beginner,intermediate,advanced',
        ]);

        $skill->update($data);
        return $skill->refresh();
    }

    public function destroy(Request $request, Skill $skill)
    {
        $this->authorizeOwner($request, $skill);
        $skill->delete();
        return response()->noContent();
    }

    private function authorizeOwner(Request $request, Skill $skill)
    {
        abort_unless($skill->user_id === $request->user()->id, 403, 'Forbidden');
    }
}
