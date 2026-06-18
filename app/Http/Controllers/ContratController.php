<?php

namespace App\Http\Controllers;

use App\Models\Contrat;
use Illuminate\Http\Request;

class ContratController extends Controller
{
    public function index()
    {
        return Contrat::with('client')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'reference' => 'required|string|unique:contrats',
            'description' => 'nullable|string',
            'montant' => 'required|numeric',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'client_id' => 'required|exists:clients,id',
        ]);

        $data['created_by'] = $request->user()->id;

        $contrat = Contrat::create($data);

        return response()->json($contrat, 201);
    }

    public function show(Contrat $contrat)
    {
        return $contrat->load('client', 'chantiers');
    }

    public function update(Request $request, Contrat $contrat)
    {
        $contrat->update($request->all());

        return $contrat;
    }

    public function destroy(Contrat $contrat)
    {
        $contrat->delete();

        return response()->json(['message' => 'Contrat supprimé']);
    }
}