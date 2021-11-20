<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\PlayerDetails;
use Illuminate\Support\Collection;

class MatchupsController extends Controller
{
    public function getMatchups(Request $request)
    {
        $playerDetails = DB::table('player_details')
            ->select('teamId','match_details_id', 'win')
            ->where('championId', $request->championId)
            ->join('match_details', 'player_details.match_details_id', '=', 'match_details.id')
            ->get();

        $ids = array_column($playerDetails->toArray(), 'match_details_id');
        $teams = array_column($playerDetails->toArray(), 'teamId');

        $collection = null;
        foreach ($ids as $key => $id) {
            $playerDetails = DB::table('player_details')
                ->select('win', 'championId')
                ->where('match_details_id', $id)
                ->where('teamId', '!=', $teams[$key])
                ->join('match_details', 'player_details.match_details_id', '=', 'match_details.id')
                ->get();
            if (!$collection) {
                $collection = $playerDetails;
            }
            else {
                $collection = $collection->merge($playerDetails);
            }
        }

        $grouped = $collection
            ->groupBy('championId');

        $matchups=[];
        foreach ($grouped as $group) {
            $wins = 0;
            $championId = null;
            foreach($group as $key => $item) {
                if (!$championId) {
                    $championId = $item->championId;
                }
                $wins += $item->win;
            }
            $matchups[$championId] = 100*($wins/($key+1));
        }

        foreach ($matchups as $key => $matchup) {
            $matchups[$key] = 100-$matchup;
        }

        arsort($matchups);

        return response()->json([
            'success' => true,
            'easiestMatchups' => array_slice($matchups, 0, 5, true),
            'hardestMatchups' => array_reverse(array_slice($matchups, -5, 5, true), true)
        ], 201);
    }
}
