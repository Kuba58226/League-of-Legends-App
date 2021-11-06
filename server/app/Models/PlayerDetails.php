<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'match_details_id',
        'participantId',
        'summonerName',
        'teamId',
        'win',
        'kills',
        'deaths',
        'assists',
        'totalDamageDealtToChampions',
        'totalMinionsKilled',
        'champLevel',
        'championId',
        'summoner1Id',
        'summoner2Id',
        'item0',
        'item1',
        'item2',
        'item3',
        'item4',
        'item5',
        'item6',
        'lane',
        'role',
    ];
}
