<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'email', 'telephone', 'entreprise', 'adresse', 'created_by'];

    public function contrats()
    {
        return $this->hasMany(Contrat::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}