<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    
    function index(){
        // return "hello from film controller";
        $totalFilms = Film::all();

        return response()->json([
            'film'=>$totalFilms,
            'status'=>200
        ]);
    }

    public function show($id){

        return response()-> json([
            'film'=> Film::find($id),
            'status'=> 200
        ]);
    }


    public function store(Request $request, film $film){
        $url = $request->url;
        $titre = $request->titre;
        $description = $request->description;

        if(!empty($url) &&  !empty($titre)) {
        
            $film->url = $url;
            $film->titre = $titre;
            $film->description = $description;
            $film->save();

            return response()->json([
                'film' => $film,
                'status' => 552,
                'msg' => 'enjoy'
            ]);    
        
        
        } else{
            return response()->json(
                [
                    'msg' => 'error',
                    'status' => 101123
                ]
                );
        }
    }
}

