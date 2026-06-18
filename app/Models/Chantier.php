<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chantier extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'description', 'localisation', 'type_travaux', 'date_debut', 'date_fin_prevue', 'date_fin_reelle', 'avancement', 'statut', 'contrat_id', 'chef_chantier_id'];

    public function contrat()
    {
        return $this->belongsTo(Contrat::class);
    }

    public function chefChantier()
    {
        return $this->belongsTo(User::class, 'chef_chantier_id');
    }

    public function avancements()
    {
        return $this->hasMany(Avancement::class);
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    public function blocages()
    {
        return $this->hasMany(Blocage::class);
    }
}