<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('formulaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenoms');
            $table->date('date_naissance');
            $table->string('sexe');
            $table->string('classe');
            $table->enum('statut_dossier', ['En attente', 'valide', 'rejete'])->default('En attente');
            $table->timestamp('date_creation')->useCurrent();
            $table->timestamp('date_validation')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('formulaires');
    }
};
