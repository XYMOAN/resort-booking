<?php

use App\Http\Controllers\RoomCategoryController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
Route::get('/room/{room}', [RoomController::class, 'show'])->name('rooms.show');
Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
Route::put('/rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
Route::delete('/rooms/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');

Route::post('/room-categories', [RoomCategoryController::class, 'store'])->name('room-categories.store');
Route::put('/room-categories/{roomCategory}', [RoomCategoryController::class, 'update'])->name('room-categories.update');
Route::delete('/room-categories/{roomCategory}', [RoomCategoryController::class, 'destroy'])->name('room-categories.destroy');

?>