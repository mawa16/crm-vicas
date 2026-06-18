<?php

namespace App\Http\Controllers;

use App\Models\Avancement;
use App\Models\Chantier;
use Illuminate\Http\Request;

class AvancementController extends Controller
{
    public function index(Chantier $chantier)
    {
        return $chantier->avancements()->with('updatedBy')->latest()->get();
    }

    public function store(Request $request, Chantier $chantier)
{
    $data = $request->validate([
        'pourcentage' => 'required|integer|min:0|max:100',
        'commentaire' => 'nullable|string',
    ]);

    $data['chantier_id'] = $chantier->id;
    $data['updated_by'] = $request->user()->id;

    $avancement = Avancement::create($data);

    // on met à jour le pourcentage du chantier
    $chantier->avancement = $data['pourcentage'];

    // on ajuste aussi le statut automatiquement
    if ($data['pourcentage'] >= 100) {
        $chantier->statut = 'termine';
        $chantier->date_fin_reelle = now();
    } elseif ($chantier->statut === 'planifie') {
        $chantier->statut = 'en_cours';
    }

    $chantier->save();

    return response()->json($avancement, 201);
}
}