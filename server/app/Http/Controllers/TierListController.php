<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TierListController extends Controller
{
    public function getTierList(Request $request)
    {
        if (isset($request->lane) && isset($request->role)) {
            $tierList = DB::table('player_details')
                ->select('championId',
                    DB::raw('100*SUM(player_details.win)/COUNT(player_details.win) as winRate'),
                    DB::raw('COUNT(player_details.win) as games'))
                ->join('match_details', 'match_details.id', '=', 'player_details.match_details_id')
                ->where('match_details.gameType','=',$request->gameType)
                ->where('match_details.gameMode','=',$request->gameMode)
                ->where('player_details.lane','=',$request->lane)
                ->where('player_details.role','=',$request->role)
                ->groupBy('championId')
                ->orderByDesc('winRate')
                ->get();
        }
        else {
            $tierList = DB::table('player_details')
                ->select('championId',
                    DB::raw('100*SUM(player_details.win)/COUNT(player_details.win) as winRate'),
                    DB::raw('COUNT(player_details.win) as games'))
                ->join('match_details', 'match_details.id', '=', 'player_details.match_details_id')
                ->where('match_details.gameType','=',$request->gameType)
                ->where('match_details.gameMode','=',$request->gameMode)
                ->groupBy('championId')
                ->orderByDesc('winRate')
                ->get();
        }

        return response()->json([
            'success' => true,
            'tierList' => $tierList,
        ], 201);
    }
}
