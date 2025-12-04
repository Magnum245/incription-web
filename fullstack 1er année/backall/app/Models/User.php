<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // Champs que Laravel autorise à remplir via User::create()
    protected $fillable = [
        'email',
        'password',
        'telephone',
        'profil',
        'newsletter'
    ];

    // Cache le mot de passe dans les réponses JSON
    protected $hidden = [
        'password',
    ];
}
