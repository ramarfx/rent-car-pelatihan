<?php

namespace App\Http\Controllers;

use App\Models\CarReturn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CarReturnController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role === 'admin') {
            $carReturns = CarReturn::all();
        } else {
            $carReturns = CarReturn::where('user_id', Auth::user()->id)->get();
        }

        return response()->json(compact('carReturns'));
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
            'rent_id' => 'required|exists:rents,id',
            'penalty_id' => 'required|exists:penalties,id',
            'date_return' => 'required',
            'total' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message'=> 'invalid field'], 401);
        }

        $carReturn = new CarReturn();
        $carReturn->rent_id = $request->rent_id;
        $carReturn->penalty_id = $request->penalty_id;
        $carReturn->date_return = $request->date_return;
        $carReturn->total = $request->total;
        $carReturn->save();

        return response()->json(['message' => 'create car return success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $carReturn = CarReturn::find($id);

        if (!$carReturn) {
            return response()->json(['message' => 'car return not found']);
        }

        return response()->json($carReturn);
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
            'rent_id' => 'required|exists:rents,id',
            'penalty_id' => 'required|exists:penalties,id',
            'date_return' => 'required',
            'total' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message'=> 'invalid login'], 401);
        }

        $rent = CarReturn::find($id);
        $rent->rent_id = $request->rent_id;
        $rent->penalty_id = $request->penalty_id;
        $rent->date_return = $request->date_return;
        $rent->total = $request->total;
        $rent->save();

        return response()->json(['message' => 'update car return success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $carReturn = CarReturn::find($id);

        if (!$carReturn) {
            return response()->json(['message' => 'car return not found']);
        }

        $carReturn->delete();

        return response()->json(['message' => 'delete car return success']);
    }
}
