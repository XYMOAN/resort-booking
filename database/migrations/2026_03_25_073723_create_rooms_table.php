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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_category_id')
                ->constrained()
                ->restrictOnDelete();

            $table->string('name');
            $table->string('slug')->unique();
            $table->integer('capacity');           // max persons
            $table->integer('available')->default(1); // number of available rooms
            $table->json('tour');
            $table->decimal('base_price', 10, 2);  // per night
            $table->json('amenities')->nullable();  // ["WiFi", "TV", "Hot tub"]
            $table->json('inclusions')->nullable();  // ["Breakfast", "Parking", "WiFi"]
            $table->json('images')->nullable();     // [{ "url": "...", "caption": "..." }]
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
