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
                    DB::raw('100*COUNT(win)/(SELECT Count(*) FROM player_details WHERE championId='.$request->championId.') as playRate'))
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

    public function getSuggestedItemsByChampion(Request $request)
    {
        $playerDetails = DB::table('player_details')
            ->select('teamId','match_details_id', 'win', 'item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6')
            ->where('championId', $request->championId)
            ->join('match_details', 'player_details.match_details_id', '=', 'match_details.id')
            ->get();

        $ids = array_column($playerDetails->toArray(), 'match_details_id');
        $teams = array_column($playerDetails->toArray(), 'teamId');
        $wins = array_column($playerDetails->toArray(), 'win');
        $items0 = array_column($playerDetails->toArray(), 'item0');
        $items1 = array_column($playerDetails->toArray(), 'item1');
        $items2 = array_column($playerDetails->toArray(), 'item2');
        $items3 = array_column($playerDetails->toArray(), 'item3');
        $items4 = array_column($playerDetails->toArray(), 'item4');
        $items5 = array_column($playerDetails->toArray(), 'item5');
        $items6 = array_column($playerDetails->toArray(), 'item6');

        $suggestedItems = [];

        foreach ($ids as $key => $id) {
            $playerDetails = DB::table('player_details')
                ->select('championId')
                ->where('match_details_id', $id)
                ->where('teamId', '!=', $teams[$key])
                ->where('championId', $request->championId1)
                ->join('match_details', 'player_details.match_details_id', '=', 'match_details.id')
                ->get();
            if ($playerDetails) {
                if (isset($playerDetails[0])) {
                    $suggestedItems['item0'][] = ['item' => $items0[$key], 'win' => $wins[$key]];
                    $suggestedItems['item1'][] = ['item' => $items1[$key], 'win' => $wins[$key]];
                    $suggestedItems['item2'][] = ['item' => $items2[$key], 'win' => $wins[$key]];
                    $suggestedItems['item3'][] = ['item' => $items3[$key], 'win' => $wins[$key]];
                    $suggestedItems['item4'][] = ['item' => $items4[$key], 'win' => $wins[$key]];
                    $suggestedItems['item5'][] = ['item' => $items5[$key], 'win' => $wins[$key]];
                    $suggestedItems['item6'][] = ['item' => $items6[$key], 'win' => $wins[$key]];
                }
            }
        }

        $highestWinrateItems = [];
        foreach($suggestedItems as $suggestedItem) {
            $items = [];
            foreach ($suggestedItem as $item) {
                if (!isset($items[$item['item']])) {
                    $items[$item['item']]['item'] = $item['item'];
                    $items[$item['item']]['wins'] = $item['win'];
                    $items[$item['item']]['count'] = 1;
                    $items[$item['item']]['winRate'] = 100*$items[$item['item']]['wins']/$items[$item['item']]['count'];
                }
                else {
                    $items[$item['item']]['wins'] += $item['win'];
                    $items[$item['item']]['count'] += 1;
                    $items[$item['item']]['winRate'] = 100*$items[$item['item']]['wins']/$items[$item['item']]['count'];
                }
            }
            $itemKeys = array_column($items, 'winRate','item');
            arsort($itemKeys);
            $key = key($itemKeys);
            $highestWinrateItems[] = ['item' => $items[$key]['item'], 'winRate' => $items[$key]['winRate']];
        }

        return response()->json([
            'success' => true,
            'suggestedItems' => $highestWinrateItems,
        ], 201);
    }
}
