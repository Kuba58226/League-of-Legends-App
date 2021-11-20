<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DataRefreshController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TierListController;
use App\Http\Controllers\SuggestedItemsController;
use App\Http\Controllers\MatchupsController;
use App\Http\Controllers\ChampionController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

Route::post('/refresh', [DataRefreshController::class,'refresh']);
Route::get('/player-data', [PlayerController::class,'getPlayerData']);
Route::get('/tier-list', [TierListController::class,'getTierList']);
Route::get('/suggested-items', [SuggestedItemsController::class,'getSuggestedItems']);
Route::get('/matchups', [MatchupsController::class,'getMatchups']);
Route::get('/suggested-items-champions', [SuggestedItemsController::class,'getSuggestedItemsByChampion']);
Route::get('/champion', [ChampionController::class,'getChampionData']);
