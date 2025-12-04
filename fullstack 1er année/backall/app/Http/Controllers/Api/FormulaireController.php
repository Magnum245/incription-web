<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Formulaire;
use Carbon\Carbon;

class FormulaireController extends Controller
{
    function showdossier(){
        return response()->json([
            'formulaire' => Formulaire::all(),
            'status' => 200
        ]);
    }

    public function store(Request $request)
    {
        // Validation
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenoms' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'sexe' => 'required|string|in:M,F',
            'classe' => 'required|string|max:50',
        ]);

        // Création du formulaire
        $formulaire = Formulaire::create([
            'nom' => $validated['nom'],
            'prenoms' => $validated['prenoms'],
            'date_naissance' => $validated['date_naissance'],
            'sexe' => $validated['sexe'],
            'classe' => $validated['classe'],
            'statut_dossier' => 'En attente',
            'date_creation' => Carbon::now(),
            'date_validation' => null
        ]);

        return response()->json([
            'message' => 'Votre inscription est réussie ! Veuillez attendre la réponse.',
            'formulaire' => $formulaire
        ], 201);
    }

    /**
     * Valider un formulaire
     */
    public function valider($id)
    {
        try {
            $formulaire = Formulaire::find($id);
            
            if (!$formulaire) {
                return response()->json([
                    'error' => 'Formulaire non trouvé',
                    'status' => 404
                ], 404);
            }

            $formulaire->statut_dossier = 'valide';
            $formulaire->date_validation = Carbon::now();
            $formulaire->save();

            return response()->json([
                'message' => 'Formulaire validé avec succès',
                'status' => 200
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la validation',
                'message' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Rejeter un formulaire
     */
    public function rejeter($id)
    {
        try {
            $formulaire = Formulaire::find($id);
            
            if (!$formulaire) {
                return response()->json([
                    'error' => 'Formulaire non trouvé',
                    'status' => 404
                ], 404);
            }

            $formulaire->statut_dossier = 'rejete';
            $formulaire->date_validation = Carbon::now();
            $formulaire->save();

            return response()->json([
                'message' => 'Formulaire rejeté avec succès',
                'status' => 200
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors du rejet',
                'message' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}