<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use App\Models\AccountDetails;

class AccountDetailsRefresh
{
    const RANKED_SOLO = 'RANKED_SOLO_5x5';
    const RANKED_FLEX = 'RANKED_FLEX_SR';

    private $ranked_solo;
    private $ranked_flex;

    public function refresh(string $account_id, string $puuid)
    {
        $response = Http::get('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/'.$puuid.'?api_key='.env('RIOT_API_KEY'));
        $data = json_decode($response->getBody());

        $response = Http::get('https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/'.$data->id.'?api_key='.env('RIOT_API_KEY'));
        $ranked_data = json_decode($response->getBody());

        $this->ranked_solo = new \stdClass();
        $this->ranked_flex = new \stdClass();

        foreach($ranked_data as $single_ranked_data) {
            if ($single_ranked_data->queueType == $this::RANKED_SOLO) {
                $this->ranked_solo = $single_ranked_data;
            }
            if ($single_ranked_data->queueType == $this::RANKED_FLEX) {
                $this->ranked_flex = $single_ranked_data;
            }
        }

        $accountDetails = AccountDetails::updateOrCreate([
            'account_id' => $account_id,
        ], [
            'encryptedSummonerId' => $data->id,
            'profileIconId' => $data->profileIconId,
            'summonerLevel' => $data->summonerLevel,
            'solo_tier' => isset($this->ranked_solo->tier) ? $this->ranked_solo->tier : null,
            'solo_rank' => isset($this->ranked_solo->rank) ? $this->ranked_solo->rank : null,
            'solo_leaguePoints' => isset($this->ranked_solo->leaguePoints) ? $this->ranked_solo->leaguePoints : null,
            'solo_wins' => isset($this->ranked_solo->wins) ? $this->ranked_solo->wins : null,
            'solo_losses' => isset($this->ranked_solo->losses) ? $this->ranked_solo->losses : null,
            'flex_tier' => isset($this->ranked_flex->tier) ? $this->ranked_flex->tier : null,
            'flex_rank' => isset($this->ranked_flex->rank) ? $this->ranked_flex->rank : null,
            'flex_leaguePoints' => isset($this->ranked_flex->leaguePoints) ? $this->ranked_flex->leaguePoints : null,
            'flex_wins' => isset($this->ranked_flex->wins) ? $this->ranked_flex->wins : null,
            'flex_losses' => isset($this->ranked_flex->losses) ? $this->ranked_flex->losses : null,
        ]);

        return $accountDetails;
    }
}
