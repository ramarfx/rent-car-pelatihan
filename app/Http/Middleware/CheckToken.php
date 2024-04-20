<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // cek apakah ada authorization header pada request yang diminta
        $authHeader = $request->header('Authorization'); //Bearer $2y$12$Cf...
        if (!$authHeader) {
            return response()->json(['message' => 'unauthorized user'], 401);
        }

        // cek token
        $token = explode(' ', $authHeader)[1]; //['Bearer', '$2y$12$Cf...']
        $user = User::where('token', $token)->first();
        if (!$user) {
            return response()->json(['message' => 'unauthorized user'], 401);
        }

        // middleware passed...
        Auth::login($user);

        return $next($request);
    }
}
