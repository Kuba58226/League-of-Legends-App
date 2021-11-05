<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\AccountRefresh;
use App\Http\Services\AccountDetailsRefresh;

class DataRefreshController extends Controller
{
    public function refresh()
    {
        $gameName = 'KlepAdasdas';
        $region = 'EUNE';

        $accountRefresh = new AccountRefresh;
        $account = $accountRefresh->refresh($gameName, $region);

        $accountDetailsRefresh = new AccountDetailsRefresh;
        $accountDetails = $accountDetailsRefresh->refresh($account->id, $account->puuid);



        return response()->json([
            'message' => 'Data refreshed succesfully',
        ], 201);
    }
}
