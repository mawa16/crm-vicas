<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blocage extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'description', 'statut', 'chantier_id', 'signale_par'];

    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }
}