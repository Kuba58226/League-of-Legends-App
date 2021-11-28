<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\Account;
use App\Models\AccountDetails;
use Illuminate\Support\Facades\DB;

class FriendsController extends Controller
{
    public function getFriendsByUser(Request $request)
    {
        $id = auth()->user()->id;

        $friends = Friend::where('user_id', $id)->get();

        foreach ($friends as $friend) {
            $account = DB::table('account_details')
                ->where('account_details.id', $friend->account_details_id)
                ->join('accounts', 'account_details.account_id', '=', 'accounts.id')
                ->get()
                ->first();
            $friend->account = $account;
        }

        return response()->json([
            'success' => true,
            'friends' => $friends
        ], 201);
    }

    public function addFriend(Request $request)
    {
        $id = auth()->user()->id;

        $account = DB::table('account_details')
            ->where('accounts.gameName', $request->friendName)
            ->join('accounts', 'account_details.account_id', '=', 'accounts.id')
            ->get()
            ->first();

        $friend = Friend::create([
            'user_id' => $id,
            'account_details_id' => $account->id
        ]);

        return response()->json([
            'success' => true,
            'friend' => $friend
        ], 201);
    }
}
