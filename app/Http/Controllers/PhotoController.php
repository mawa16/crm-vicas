<?php

namespace App\Http\Controllers;

use App\Models\Chantier;
use App\Models\Photo;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function index(Chantier $chantier)
    {
        return $chantier->photos()->latest()->get();
    }

    public function store(Request $request, Chantier $chantier)
    {
        $request->validate([
            'photo' => 'required|image|max:5120',
            'type' => 'required|in:avant,pendant,apres',
            'legende' => 'nullable|string',
        ]);

        $path = $request->file('photo')->store('chantiers', 'public');

        $photo = Photo::create([
            'url' => $path,
            'legende' => $request->legende,
            'type' => $request->type,
            'chantier_id' => $chantier->id,
            'uploaded_by' => $request->user()->id,
        ]);

        return response()->json($photo, 201);
    }

    public function destroy(Photo $photo)
    {
        \Storage::disk('public')->delete($photo->url);
        $photo->delete();

        return response()->json(['message' => 'Photo supprimée']);
    }
}