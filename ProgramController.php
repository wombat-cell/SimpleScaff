<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $program = Program::with('Artist')->get();
        return response()->json($program);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::debug("Program Store Data:" . $request);
        $request->validate([
            'name' => 'required|string|max:255',
            'artist_id' => 'required|integer',
            'runtime' => 'required|integer',
            'payment_type' => 'required|string',
            'price' => 'required|integer',
        ]);
        

        $program = Program::create([
            'name' => $request->name,
            'artist_id' => $request->artist_id,
            'runtime' => $request->runtime,
            'payment_type' => $request->payment_type,
            'price' => $request->price,
            'created_at' => new Date(),
        ])->save();

        return response()->json([
            'message' => 'Program created successfully',
            'program' => $program
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        Log::debug("Show Program called for: " . $id);
        $program = Program::where('id', $id)->with('Artist', 'Performance')->get();
        return response()->json($program);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        Log::debug("Program Update Data:" . $request->id);
         $program = Program::where('id', $request->id)->first();

         $request->validate([
            'name' => 'required|string|max:255',
            'artist_id' => 'required|integer',
            'runtime' => 'required|integer',
            'payment_type' => 'required|string',
            'price' => 'required|integer',
        ]);

        
        $program->update($request->only([
            'name',
            'artist_id',
            'runtime',
            'payment_type',
            'price',
        ]));
        return response()->json($program);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $program = Program::find('id', $id);
        $program->delete();

        return response()->json([
            'message' => 'Program deleted successfully',
        ], 201);
    }
}
