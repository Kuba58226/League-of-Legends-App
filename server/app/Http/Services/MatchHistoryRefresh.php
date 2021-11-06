<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;

class MatchHistoryRefresh
{
    public function refresh(string $puuid)
    {
        $response = Http::get('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/'.$puuid.'/ids?start=0&count=20&api_key='.env('RIOT_API_KEY'));
        $data = json_decode($response->getBody());

        return $data;
    }
}
