<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    /**
     * Upload foto profil
     */
    public function profile(Request $request)
    {
        $request->validate([
            'photo' => ['required', 'image', 'max:2048']
        ]);

        $path = $request->file('photo')->store('profile', 'public');
        $url  = Storage::url($path);

        // Simpan path relatif di DB
        $user = $request->user();
        $user->profile_photo = $path;
        $user->save();

        return response()->json([
            'url' => url($url),
            'user' => $user,
            'profile_photo_url' => url($url),
        ]);
    }

    /**
     * Upload gambar project
     */
    public function projectImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'max:4096']
        ]);

        $path = $request->file('image')->store('projects', 'public');
        $url  = Storage::url($path);

        return response()->json([
            'url' => url($url),
            'path' => $path
        ]);
    }

    /**
     * Upload gambar sertifikat
     */
    public function certificateImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'max:4096']
        ]);

        $path = $request->file('image')->store('certificates', 'public');
        $url  = Storage::url($path);

        return response()->json([
            'url' => url($url),
            'path' => $path
        ]);
    }
}
