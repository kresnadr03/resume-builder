<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EducationController extends Controller
{
    public function index(Request $request)
    {
        return Education::where('user_id', $request->user()->id)
            ->latest('end_year')
            ->get();
    }

    public function store(Request $request)
    {
        Log::info('Received Education Data:', $request->all());

        $data = $request->validate([
            'school'     => 'required|string|max:150',
            'degree'     => 'nullable|string|max:150',
            'start_year' => 'nullable|digits:4|integer|min:1900|max:2100',
            'end_year'   => 'nullable|digits:4|integer|min:1900|max:2100',
        ]);

        $data['user_id'] = $request->user()->id;
        Log::info('Validated Data:', $data);

        return Education::create($data);
    }

    public function show(Request $request, Education $education)
    {
        $this->authorizeOwner($request, $education);
        return $education;
    }

    public function update(Request $request, Education $education)
    {
        $this->authorizeOwner($request, $education);

        $data = $request->validate([
            'school'     => 'sometimes|string|max:150',
            'degree'     => 'sometimes|nullable|string|max:150',
            'start_year' => 'sometimes|nullable|digits:4|integer|min:1900|max:2100',
            'end_year'   => 'sometimes|nullable|digits:4|integer|min:1900|max:2100',
        ]);

        $education->update($data);
        return $education->refresh();
    }

    public function destroy(Request $request, Education $education)
    {
        $this->authorizeOwner($request, $education);
        $education->delete();
        return response()->noContent();
    }

    private function authorizeOwner(Request $request, Education $education)
    {
        abort_unless($education->user_id === $request->user()->id, 403, 'Forbidden');
    }
}
