<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Account;

class AccountRefresh
{
    public function refresh(string $gameName, string $region)
    {
        $response = Http::get('https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/'.$gameName.'/'.$region.'?api_key='.env('RIOT_API_KEY'));
        $data = json_decode($response->getBody());

        $account = Account::updateOrCreate([
            'puuid' => $data->puuid,
        ], [
            'gameName' => $data->gameName,
            'tagLine' => $data->tagLine
        ]);

        return $account;
    }
}
