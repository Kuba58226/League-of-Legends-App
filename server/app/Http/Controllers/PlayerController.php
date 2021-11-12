<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\AccountDetails;

class PlayerController extends Controller
{
    public function getPlayerData(Request $request)
    {
        $account = Account::where('gameName', $request->gameName)->get()->first();
        if ($account) {
            $accountDetails = AccountDetails::where('account_id', $account->getAttributes()['id'])->get();
            $playerDetails = DB::table('player_details')
                ->where('puuid', $account->getAttributes()['puuid'])
                ->join('match_details', 'player_details.match_details_id', '=', 'match_details.id')
                ->get();
            $ids = array_column($playerDetails->toArray(), 'match_details_id');
            $matchHistory = DB::table('player_details')
                ->whereIn('match_details_id', $ids)
                ->join('match_details', 'player_details.match_details_id', '=', 'match_details.id')
                ->get();
        }

        return response()->json([
            'success' => true,
            'account' => $account,
            'accountDetails' => isset($accountDetails) ? $accountDetails : null,
            'playerDetails' => isset($playerDetails) ? $playerDetails : null,
            'matchHistory' => isset($matchHistory) ? $matchHistory : null,
        ], 201);
    }
}
