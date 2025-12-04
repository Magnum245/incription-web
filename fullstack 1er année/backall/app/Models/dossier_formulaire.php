<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DossierFormulaire extends Model
{
    use HasFactory;

    protected $table = 'dossier_formulaires';

    protected $fillable = [
        'nom',
        'prenom',
        'date_naissance',
        'sexe',
        'statut_dossier',
        'date_creation',
        'date_validation'
    ];
}
