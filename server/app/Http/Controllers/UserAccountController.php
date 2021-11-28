<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\UserAccount;
use Illuminate\Support\Facades\DB;

class UserAccountController extends Controller
{
    public function getUserAccount(Request $request)
    {
        $id = auth()->user()->id;

        $userAccount = UserAccount::where('user_id', $id)->get()->first();

        $account = DB::table('account_details')
            ->where('account_details.id', $userAccount->account_details_id)
            ->join('accounts', 'account_details.account_id', '=', 'accounts.id')
            ->get()
            ->first();
        $userAccount->account = $account;

        return response()->json([
            'success' => true,
            'userAccount' => $userAccount
        ], 201);
    }
    public function setUserAccount(Request $request)
    {
        $id = auth()->user()->id;

        $account = DB::table('account_details')
            ->where('accounts.gameName', $request->gameName)
            ->join('accounts', 'account_details.account_id', '=', 'accounts.id')
            ->get()
            ->first();

        $userAccount = UserAccount::updateOrCreate([
            'user_id' => $id
        ], [
            'account_details_id' => $account->id
        ]);

        return response()->json([
            'success' => true,
            'userAccount' => $userAccount
        ], 201);
    }
}
