<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'gameId',
        'gameCreation',
        'gameDuration',
        'gameMode',
        'gameType',
        'gameVersion',
        'mapId'
    ];
}
