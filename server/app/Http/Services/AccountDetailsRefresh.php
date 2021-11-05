<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use App\Models\AccountDetails;

class AccountDetailsRefresh
{
    public function refresh(string $account_id, string $puuid)
    {
        $response = Http::get('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/'.$puuid.'?api_key='.env('RIOT_API_KEY'));
        $data = json_decode($response->getBody());

        $accountDetails = AccountDetails::updateOrCreate([
            'account_id' => $account_id,
        ], [
            'profileIconId' => $data->profileIconId,
            'summonerLevel' => $data->summonerLevel
        ]);

        return $accountDetails;
    }
}
