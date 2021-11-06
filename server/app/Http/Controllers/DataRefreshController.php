<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\AccountRefresh;
use App\Http\Services\AccountDetailsRefresh;
use App\Http\Services\MatchHistoryRefresh;
use App\Http\Services\MatchDetailsRefresh;

class DataRefreshController extends Controller
{
    public function refresh(Request $request)
    {
        $accountRefresh = new AccountRefresh;
        $account = $accountRefresh->refresh($request->gameName, $request->region);

        $accountDetailsRefresh = new AccountDetailsRefresh;
        $accountDetails = $accountDetailsRefresh->refresh($account->id, $account->puuid);

        $matchHistoryRefresh = new MatchHistoryRefresh();
        $matchHistory = $matchHistoryRefresh->refresh($account->puuid);

        foreach ($matchHistory as $match) {
            $matchDetailsRefresh = new MatchDetailsRefresh();
            $matchDetails = $matchDetailsRefresh->refresh($match);
        }

        return response()->json([
            'message' => 'Data refreshed succesfully',
        ], 201);
    }
}
