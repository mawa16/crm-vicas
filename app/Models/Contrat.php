<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrat extends Model
{
    use HasFactory;

    protected $fillable = ['reference', 'description', 'montant', 'date_debut', 'date_fin', 'statut', 'client_id', 'created_by'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function chantiers()
    {
        return $this->hasMany(Chantier::class);
    }
}