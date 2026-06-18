<?php

namespace App\Http\Controllers;

use App\Models\Blocage;
use App\Models\Chantier;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class BlocageController extends Controller
{
    public function index(Chantier $chantier)
    {
        return $chantier->blocages()->latest()->get();
    }

    public function store(Request $request, Chantier $chantier)
    {
        $data = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
        ]);

        $data['chantier_id'] = $chantier->id;
        $data['signale_par'] = $request->user()->id;
        $data['statut'] = 'ouvert';

        $blocage = Blocage::create($data);

        // le chantier passe en statut "bloqué"
        $chantier->update(['statut' => 'bloque']);

        // notification automatique pour la direction
        foreach (User::where('role', 'direction')->get() as $dir) {
            Notification::create([
                'titre' => 'Nouveau blocage signalé',
                'message' => "Blocage sur le chantier {$chantier->nom} : {$data['titre']}",
                'type' => 'blocage',
                'user_id' => $dir->id,
            ]);
        }

        return response()->json($blocage, 201);
    }

    public function update(Request $request, Blocage $blocage)
    {
        $data = $request->validate([
            'statut' => 'required|in:ouvert,en_cours,resolu',
        ]);

        $blocage->update($data);

        // si le blocage est résolu, on remet le chantier en "en_cours"
        if ($data['statut'] === 'resolu') {
            $blocage->chantier->update(['statut' => 'en_cours']);
        }

        return $blocage;
    }
}