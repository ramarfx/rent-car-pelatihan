<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role === 'admin') {
            $rents = Rent::all();
        } else {
            $rents = Rent::where('user_id', Auth::user()->id)->get();
        }

        return response()->json(compact('rents'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 422);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'tenant' => 'required',
            'no_car' => 'required',
            'date_borrow' => 'required|date',
            'date_return' => 'required|date',
            'down_payment' => 'required',
            'total' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message'=> 'invalid login'], 401);
        }

        $rent = new Rent();
        $rent->user_id = $request->user_id;
        $rent->tenant = $request->tenant;
        $rent->no_car = $request->no_car;
        $rent->date_borrow = $request->date_borrow;
        $rent->date_return = $request->date_return;
        $rent->down_payment = $request->down_payment;
        $rent->total = $request->total;
        $rent->status = $request->status;
        $rent->save();

        return response()->json(['message' => 'create rent success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rent = Rent::find($id);

        if (!$rent) {
            return response()->json(['message' => 'rent not found']);
        }

        return response()->json($rent);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 422);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'tenant' => 'required',
            'no_car' => 'required',
            'date_borrow' => 'required|date',
            'date_return' => 'required|date',
            'down_payment' => 'required',
            'total' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message'=> 'invalid login'], 401);
        }

        //tes

        $rent = Rent::find($id);
        $rent->user_id = $request->user_id;
        $rent->tenant = $request->tenant;
        $rent->no_car = $request->no_car;
        $rent->date_borrow = $request->date_borrow;
        $rent->date_return = $request->date_return;
        $rent->down_payment = $request->down_payment;
        $rent->total = $request->total;
        $rent->status = $request->status;
        $rent->save();

        return response()->json($rent);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (Auth::user()->role != 'admin') {
            return response()->json(['message' => 'Forbidden'], 422);
        }

        $rent = Rent::find($id);

        if (!$rent) {
            return response()->json(['message' => 'rent not found']);
        }

        $rent->delete();

        return response()->json(['message' => 'delete rent success']);
    }
}
