<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    //

    public function index(){
        return Inertia::render('Authentication', ['title'=>'Authentication']);
    }
    public function loginWithUserPass(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);


        return back()->withErrors([
            'status' => false,
            'message' => 'Invalid credentials',
        ]);
    }

    public function loginWithPassCode(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);


        return back()->withErrors([
            'status' => false,
            'message' => 'Invalid credentials',
        ]);
    }
}
