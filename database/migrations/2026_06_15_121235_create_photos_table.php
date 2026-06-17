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
       Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('legende')->nullable();
            $table->enum('type', ['avant', 'pendant', 'apres'])->default('pendant');
            $table->foreignId('chantier_id')->constrained('chantiers')->onDelete('cascade');
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
