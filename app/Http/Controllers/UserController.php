<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // jika bukan admin, maka tidak boleh register
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 401);
        }

        // validasi
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'invalid field'], 401);
        }

        // simpan database
        $user = new User();
        $user->username = $request->username;
        $user->password = bcrypt($request->password);
        $user->phone = $request->phone;
        $user->save();

        // return json
        return response()->json(['message' => 'create register success']);
    }

    public function index()
    {
        //jika admin, maka tidak boleh
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 401);
        }

        $user = User::all();

        return response()->json($user);
    }

    public function update(Request $request, string $id)
    {
        //jika admin, maka tidak boleh
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 401);
        }

        // validasi
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
            'phone' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'invalid field'], 401);
        }

        $user = User::find($id);
        $user->username = $request->username;
        $user->password = bcrypt($request->password);
        $user->phone = $request->phone;
        $user->save();

        return response()->json(['message' => 'update register success']);
    }

    public function delete(string $id)
    {
        //jika admin, maka tidak boleh
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 401);
        }

        $user = User::find($id);
        $user->delete();
        return response()->json(['message' => 'delete register success']);
    }

}
