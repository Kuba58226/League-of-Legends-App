<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getUsers(Request $request)
    {
        $users = User::all();

        return response()->json([
            'success' => true,
            'users' => $users
        ], 201);
    }
}
