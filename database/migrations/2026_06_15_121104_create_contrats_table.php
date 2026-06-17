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
        Schema::create('contrats', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->text('description')->nullable();
            $table->decimal('montant', 15, 2);
            $table->date('date_debut');
            $table->date('date_fin');
            $table->enum('statut', ['en_cours', 'termine', 'suspendu', 'resilie'])->default('en_cours');
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contrats');
    }
};
