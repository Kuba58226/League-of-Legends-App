<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'encryptedSummonerId',
        'profileIconId',
        'summonerLevel',
        'solo_tier',
        'solo_rank',
        'solo_leaguePoints',
        'solo_wins',
        'solo_losses',
        'flex_tier',
        'flex_rank',
        'flex_leaguePoints',
        'flex_wins',
        'flex_losses',
    ];
}
