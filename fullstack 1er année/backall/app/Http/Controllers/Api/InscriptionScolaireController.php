<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DossierFormulaire;
use Carbon\Carbon;

class InscriptionScolaireController extends Controller
{
    public function store(Request $request)
    {
        // Validation des champs
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenoms' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'sexe' => 'required|string|in:M,F',
            'classe' => 'required|string|max:50'
        ]);

        // Création du dossier
        $dossier = DossierFormulaire::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenoms'],
            'date_naissance' => $validated['date_naissance'],
            'sexe' => $validated['sexe'],
            'statut_dossier' => 'En attente',  // dossier en attente
            'date_creation' => Carbon::now(),
            'date_validation' => null
        ]);

        return response()->json([
            'message' => 'Votre inscription a été reçue avec succès. Veuillez attendre la réponse.',
            'dossier' => $dossier
        ], 201);
    }
}
