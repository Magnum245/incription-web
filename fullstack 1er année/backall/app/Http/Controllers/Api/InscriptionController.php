<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class InscriptionController extends Controller
{

    function showuser(){

        return response()->json([
            'user' => User::all(),
            'status' => 200
        ]);
    }
    
    function showadmin(){

        return response()->json([
            'admin' => Admin::all(),
            'status' => 200
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'mot_de_passe' => 'required|min:8',
            'telephone' => 'required',
            'profil' => 'required',
            'newsletter' => 'boolean'
        ]);

        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['mot_de_passe']),
            'telephone' => $validated['telephone'],
            'profil' => $validated['profil'],
            'newsletter' => $request->input('newsletter', false),
        ]);

        return response()->json([
            'message' => 'Utilisateur créé avec succès',
            'user' => $user
        ], 201);
    }

    /**
     * Supprimer un administrateur
     */
    public function deleteAdmin($id)
    {
        try {
            // Vérifier si l'administrateur existe
            $admin = Admin::find($id);
            
            if (!$admin) {
                return response()->json([
                    'error' => 'Administrateur non trouvé',
                    'status' => 404
                ], 404);
            }

            // Empêcher la suppression du dernier administrateur
            $adminCount = Admin::count();
            if ($adminCount <= 1) {
                return response()->json([
                    'error' => 'Impossible de supprimer le dernier administrateur',
                    'status' => 400
                ], 400);
            }

            // Supprimer l'administrateur
            $admin->delete();

            return response()->json([
                'message' => 'Administrateur supprimé avec succès',
                'status' => 200
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la suppression',
                'message' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}