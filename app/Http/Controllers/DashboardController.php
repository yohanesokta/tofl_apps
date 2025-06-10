<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;    
use App\Models\History;  

class DashboardController extends Controller
{
   
    public function index(Request $request)
    {
        $users = User::latest()->get();
        $histories = History::latest('date')->paginate(10, ['*'], 'histories_page');
        return view('dashboard', compact('users', 'histories'));
    }
}