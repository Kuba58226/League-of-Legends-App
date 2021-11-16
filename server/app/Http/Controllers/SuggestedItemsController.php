<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\PlayerDetails;

class SuggestedItemsController extends Controller
{
    public function getSuggestedItems(Request $request)
    {
        $suggestedItems= [];
        $items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

        foreach ($items as $item) {
            $suggestedItem = DB::table('player_details')
                ->select(DB::raw($item.' as item'),
                    DB::raw('100*SUM(win)/COUNT(win) as winRate'),
                    DB::raw('100*COUNT(win)/(SELECT Count(*) FROM player_details WHERE championId=1) as playRate'))
                ->where('championId','=',$request->championId)
                ->groupBy($item)
                ->having('playRate','>',5)
                ->limit(1)
                ->get();
            if ($suggestedItem) {
                $suggestedItems[] = $suggestedItem;
            }
        }

        return response()->json([
            'success' => true,
            'suggestedItems' => $suggestedItems,
        ], 201);
    }
}
