<?php

namespace App\Http\Controllers;

use App\Models\Chantier;
use Illuminate\Http\Request;

class ChantierController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role === 'chef_chantier') {
            return Chantier::where('chef_chantier_id', $request->user()->id)
                ->with('contrat.client')
                ->get();
        }

        // direction et admin voient tout
        return Chantier::with('contrat.client', 'chefChantier')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string',
            'description' => 'nullable|string',
            'localisation' => 'required|string',
            'type_travaux' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin_prevue' => 'required|date|after:date_debut',
            'contrat_id' => 'required|exists:contrats,id',
            'chef_chantier_id' => 'required|exists:users,id',
        ]);

        $chantier = Chantier::create($data);

        return response()->json($chantier, 201);
    }

    public function show(Chantier $chantier)
    {
        return $chantier->load('contrat.client', 'chefChantier', 'avancements', 'photos', 'blocages');
    }

    public function update(Request $request, Chantier $chantier)
    {
        // un chef de chantier ne peut modifier que son propre chantier
        if ($request->user()->role === 'chef_chantier'
            && $chantier->chef_chantier_id !== $request->user()->id) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $chantier->update($request->all());

        return $chantier;
    }

    public function destroy(Chantier $chantier)
    {
        $chantier->delete();

        return response()->json(['message' => 'Chantier supprimé']);
    }
}