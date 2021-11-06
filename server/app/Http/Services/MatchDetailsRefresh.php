<?php

namespace App\Http\Services;

use App\Models\MatchDetails;
use App\Models\PlayerDetails;
use Illuminate\Support\Facades\Http;

class MatchDetailsRefresh
{
    public function refresh(string $matchId)
    {
        $response = Http::get('https://europe.api.riotgames.com/lol/match/v5/matches/'.$matchId.'?api_key='.env('RIOT_API_KEY'));
        $data = json_decode($response->getBody());

        $matchDetails = MatchDetails::firstOrCreate([
            'gameId' => $data->info->gameId,
        ], [
            'gameCreation' => $data->info->gameCreation,
            'gameDuration' => $data->info->gameDuration,
            'gameMode' => $data->info->gameMode,
            'gameType' => $data->info->gameType,
            'gameVersion' => $data->info->gameVersion,
            'mapId' => $data->info->mapId,
        ]);

        foreach($data->info->participants as $participant) {
            $playerDetails = PlayerDetails::firstOrCreate([
                'match_details_id' => $matchDetails->id,
                'participantId' => $participant->participantId
            ], [
                'summonerName' => $participant->summonerName,
                'teamId' => $participant->teamId,
                'win' => $participant->win,
                'kills' => $participant->kills,
                'deaths' => $participant->deaths,
                'assists' => $participant->assists,
                'totalDamageDealtToChampions' => $participant->totalDamageDealtToChampions,
                'totalMinionsKilled' => $participant->totalMinionsKilled,
                'champLevel' => $participant->champLevel,
                'championId' => $participant->championId,
                'summoner1Id' => $participant->summoner1Id,
                'summoner2Id' => $participant->summoner2Id,
                'item0' => $participant->item0,
                'item1' => $participant->item1,
                'item2' => $participant->item2,
                'item3' => $participant->item3,
                'item4' => $participant->item4,
                'item5' => $participant->item5,
                'item6' => $participant->item6,
                'lane' => $participant->lane,
                'role' => $participant->role,
            ]);
        }

        return $data;
    }
}
