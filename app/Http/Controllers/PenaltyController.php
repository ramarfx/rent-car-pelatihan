<?php

namespace App\Http\Controllers;

use App\Models\Penalty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PenaltyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role === 'admin') {
            $penalties = Penalty::all();
        } else {
            $penalties = Penalty::where('user_id', Auth::user()->id)->get();
        }

        return response()->json($penalties);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'no_car' => 'required',
            'keterangan' => 'required',
            'total' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message'=> 'invalid login'], 401);
        }

        $penalty = new Penalty();
        $penalty->user_id = $request->user_id;
        $penalty->no_car = $request->no_car;
        $penalty->keterangan = $request->keterangan;
        $penalty->total = $request->total;
        $penalty->save();

        return response()->json(['message' => 'create penalty success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penalty = Penalty::find($id);

        if (!$penalty) {
            return response()->json(['message' => 'penalty not found']);
        }

        return response()->json($penalty);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'no_car' => 'required',
            'keterangan' => 'required',
            'total' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message'=> 'invalid login'], 401);
        }

        $penalty = Penalty::find($id);
        $penalty->user_id = $request->user_id;
        $penalty->no_car = $request->no_car;
        $penalty->keterangan = $request->keterangan;
        $penalty->total = $request->total;
        $penalty->save();

        return response()->json(['message' => 'edit penalty success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $penalty = Penalty::find($id);

        if (!$penalty) {
            return response()->json(['message' => 'penalty not found']);
        }

        $penalty->delete();

        return response()->json(['message' => 'delete penalty success']);
    }
}
