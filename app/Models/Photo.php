<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['url', 'legende', 'type', 'chantier_id', 'uploaded_by'];

    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }
}