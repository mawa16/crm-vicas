<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('chantiers', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description')->nullable();
            $table->string('localisation');
            $table->string('type_travaux');
            $table->date('date_debut');
            $table->date('date_fin_prevue');
            $table->date('date_fin_reelle')->nullable();
            $table->integer('avancement')->default(0); // pourcentage 0-100
            $table->enum('statut', ['planifie', 'en_cours', 'termine', 'bloque'])->default('planifie');
            $table->foreignId('contrat_id')->constrained('contrats')->onDelete('cascade');
            $table->foreignId('chef_chantier_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chantiers');
    }
};
