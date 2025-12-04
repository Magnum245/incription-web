<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginadminController extends Controller
{
     public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',          // EXISTANT: Validation de l'email
            'password' => 'required|min:8',   // EXISTANT: Validation du mot de passe
            'nom' => 'required|string|min:2'      // AJOUT: Validation du nom d'utilisateur
        ]);

        // AJOUT: Recherche de l'utilisateur par email ET nom
        $admin = Admin::where('email', $request->email)
                    ->where('nom', $request->nom)  // AJOUT: Vérification du nom
                    ->first();

        // EXISTANT: Vérification du mot de passe (inchangé)
        if (!$admin || !Hash::check($request->password, $admin->password)) {

            //securisation de admin
            Auth::guard('admin')->login($admin);

           
           
            return response()->json([
                'success' => false,
                'message' => 'Identifiants incorrects'
            ], 401);
        }

        // EXISTANT: Réponse de succès (inchangée)
        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie',
            'admin' => $admin
        ]);
    }
    //
}