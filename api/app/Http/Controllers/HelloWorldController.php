<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloWorldController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'message' => 'Hello World',
            'user' => $request->jwt_payload ?? null,
        ]);
    }
}
