<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return Client::with('contrats')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'nullable|email',
            'telephone' => 'nullable|string',
            'entreprise' => 'nullable|string',
            'adresse' => 'nullable|string',
        ]);

        $data['created_by'] = $request->user()->id;

        $client = Client::create($data);

        return response()->json($client, 201);
    }

    public function show(Client $client)
    {
        return $client->load('contrats');
    }

    public function update(Request $request, Client $client)
    {
        $client->update($request->all());

        return $client;
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json(['message' => 'Client supprimé']);
    }
}