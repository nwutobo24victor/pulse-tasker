<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    //

    public function index()
    {
        return Inertia::render('Authentication', ['title' => 'Authentication']);
    }

    public function registerUser(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|unique:users,email',
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            $user = User::create([
                'email' => $credentials['email'],
                'username' => $credentials['username'],
                'password' => Hash::make($credentials['password']),
            ]);

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'error' => 'User registration failed',
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => 'User created successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'error' => $e->getMessage() // remove in production
            ], 500);
        }
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
            'passcode' => 'required|string',
        ]);



        return back()->withErrors([
            'status' => false,
            'message' => 'Invalid passcode',
        ]);
    }
}
