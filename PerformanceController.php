<?php

namespace App\Http\Controllers;

use App\Models\Performance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;

class PerformanceController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $performance = Performance::all();
        return response()->json($performance);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $performance = Performance::create([
            'time_slot_start' => $request->time_slot_start,
            'time_slot_end' => $request->time_slot_end,
            'created_at' => new Date.now(),
        ])->save();

        return response()->json([
            'message' => 'Program created successfully',
            'program' => $performance
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $performance = Performance::where('id', $id)->get();
        Log::debug("Performance Response: " . $performance);
        return response()->json($performance);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        
        $performance = Performance::where('id', $request->id)->first();

        $performance->update($request->all());

        return response()->json([
            'message' => 'Program created successfully',
            'program' => $performance
        ], 201);
        
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
