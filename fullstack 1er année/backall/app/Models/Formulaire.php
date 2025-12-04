<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formulaire extends Model
{
    use HasFactory;

    protected $table = 'formulaires';

    protected $fillable = [
        'nom',
        'prenoms',
        'date_naissance',
        'sexe',
        'classe',
        'statut_dossier',
        'date_creation',
        'date_validation'
    ];
}
