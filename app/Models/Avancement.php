<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avancement extends Model
{
    use HasFactory;

    protected $fillable = ['pourcentage', 'commentaire', 'chantier_id', 'updated_by'];

    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}