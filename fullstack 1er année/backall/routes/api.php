<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FilmController;
use App\Http\Controllers\Api\InscriptionController;
use App\Http\Controllers\Api\FormulaireController;
use App\Http\Controllers\Api\LoginadminController;
use App\Http\Controllers\Api\LoginController;
use App\Models\Admin;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/{id}', [FilmController::class, 'show'] );
Route::post('/films/store', [FilmController::class, 'store']);

//Inscription routes
Route::post('/inscription', [InscriptionController::class, 'store']);

//Formulaire routes      
Route::post('/formulaire', [FormulaireController::class, 'store']);

//Verifier connection utilisateurs
Route::post('/login', [LoginController::class, 'login']);

//Verifier connection admins
Route::post('/loginadmin', [LoginadminController::class, 'login']);
//Verifier connection admins avec securisation
Route::middleware('auth:admin') -> get('/Dashbord', [LoginadminController::class, 'Dashbord']);

//collecte des donn''es compte user
Route::get('/setting', [InscriptionController::class, 'showuser']);
//collecte admin
Route::get('/admin', [InscriptionController::class, 'showadmin']);

//collecte de infos du formulaires
Route::get('/dossier', [FormulaireController::class, 'showdossier']);

//delete admin
Route::delete('/admin/{id}', [InscriptionController::class, 'deleteAdmin']);

//valide et rejet formulaire
// Routes pour valider/rejeter les formulaires
Route::put('/formulaire/{id}/valider', [FormulaireController::class, 'valider']);
Route::put('/formulaire/{id}/rejeter', [FormulaireController::class, 'rejeter']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
