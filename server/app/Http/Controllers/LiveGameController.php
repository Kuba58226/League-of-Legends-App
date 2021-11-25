<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LiveGameController extends Controller
{
    public function getLiveGame(Request $request)
    {
        $response = Http::get('https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/'.$request->gameName.'/'.$request->region.'?api_key='.env('RIOT_API_KEY'));
        $data = json_decode($response->getBody());

        $response = Http::get('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/'.$data->puuid.'?api_key='.env('RIOT_API_KEY'));
        $data = json_decode($response->getBody());

        $response = Http::get('https://eun1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/'.$data->id.'?api_key='.env('RIOT_API_KEY'));
        $data = json_decode($response->getBody());

        if ($response->status() === 404) {
            return response()->json([
                'success' => false,
            ], 404);
        }

        $summonerChampion = null;
        $summonerTeam = null;
        foreach($data->participants as $participant) {
            if ($participant->summonerName === $request->gameName) {
                $summonerChampion = $participant->championId;
                $summonerTeam = $participant->teamId;
            }
        }

        $summonerOpponents = [];
        foreach($data->participants as $participant) {
            if ($participant->teamId !== $summonerTeam) {
                $summonerOpponents[] = $participant->championId;
            }
        }

        return response()->json([
            'success' => true,
            'liveGame' => $data,
            'summonerChampion' => $summonerChampion,
            'summonerOpponents' => $summonerOpponents
        ], 201);
    }
}
