<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\AccountDetails;
use App\Models\PlayerDetails;
use App\Models\MatchDetails;

class PlayerController extends Controller
{
    public function getPlayerData(Request $request)
    {
        $account = Account::where('gameName', $request->gameName)->get()->first();
        if ($account) {
            $accountDetails = AccountDetails::where('account_id', $account->getAttributes()['id'])->get();
            $playerDetails = PlayerDetails::where('puuid', $account->getAttributes()['puuid'])->get();

            $ids = array_column($playerDetails->toArray(), 'match_details_id');
            $matchDetails = MatchDetails::find($ids);

            $matchHistory = PlayerDetails::whereIn('match_details_id', $ids)->get();
        }

        return response()->json([
            'account' => $account,
            'accountDetails' => isset($accountDetails) ? $accountDetails : null,
            'playerDetails' => isset($playerDetails) ? $playerDetails : null,
            'matchDetails' => isset($matchDetails) ? $matchDetails : null,
            'matchHistory' => isset($matchHistory) ? $matchHistory : null,
        ], 201);
    }
}
