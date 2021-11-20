<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ChampionController extends Controller
{
    public function getChampionData(Request $request)
    {
        $playerDetails = DB::table('player_details')
            ->select(
                DB::raw('100*SUM(win)/COUNT(*) as winRate'),
                DB::raw('COUNT(*) as games'),
                DB::raw('1000*COUNT(*)/(SELECT COUNT(*) FROM player_details) as playRate')
            )
            ->where('championId', $request->championId)
            ->get();

        return response()->json([
            'success' => true,
            'champion' => $playerDetails
        ], 201);
    }
}
