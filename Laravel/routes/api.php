<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
use App\Http\Resources\NoteResource;
use App\Models\Notes;
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

Route::get('/notes', [NoteController::class,'index']);
Route::get('/note/{id}', [NoteController::class,'getNoteById']);
Route::post('/note', [NoteController::class,'store']);
Route::put('/note/{id}', [NoteController::class,'updateNote']);
Route::delete('/note/{id}', [NoteController::class,'destroy'] );
Route::get('/searchnotes/search_notes',  [NoteController::class,'search_notes']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
