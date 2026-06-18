<?php

namespace App\Http\Controllers;

use App\Models\Chantier;
use App\Models\Client;
use App\Models\Contrat;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_chantiers' => Chantier::count(),
            'chantiers_en_cours' => Chantier::where('statut', 'en_cours')->count(),
            'chantiers_termines' => Chantier::where('statut', 'termine')->count(),
            'chantiers_bloques' => Chantier::where('statut', 'bloque')->count(),
            'avancement_moyen' => round(Chantier::avg('avancement'), 1),
            'total_clients' => Client::count(),
            'total_contrats' => Contrat::count(),
            'contrats_en_cours' => Contrat::where('statut', 'en_cours')->count(),
            'chantiers_en_retard' => Chantier::where('date_fin_prevue', '<', now())
                ->where('statut', '!=', 'termine')
                ->count(),
        ]);
    }
}