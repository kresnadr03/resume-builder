<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index(Request $request)
    {
        return Certificate::where('user_id', $request->user()->id)
            ->latest('created_at')
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'  => 'required|string|max:150',
            'issuer' => 'nullable|string|max:150',
            'image'  => 'nullable|string|max:255', // path/url dari endpoint upload
        ]);

        $data['user_id'] = $request->user()->id;
        return Certificate::create($data);
    }

    public function show(Request $request, Certificate $certificate)
    {
        $this->authorizeOwner($request, $certificate);
        return $certificate;
    }

    public function update(Request $request, Certificate $certificate)
    {
        $this->authorizeOwner($request, $certificate);

        $data = $request->validate([
            'title'  => 'sometimes|string|max:150',
            'issuer' => 'sometimes|nullable|string|max:150',
            'image'  => 'sometimes|nullable|string|max:255',
        ]);

        $certificate->update($data);
        return $certificate->refresh();
    }

    public function destroy(Request $request, Certificate $certificate)
    {
        $this->authorizeOwner($request, $certificate);
        $certificate->delete();
        return response()->noContent();
    }

    private function authorizeOwner(Request $request, Certificate $certificate)
    {
        abort_unless($certificate->user_id === $request->user()->id, 403, 'Forbidden');
    }
}
