<?php

namespace App\Http\Controllers;

use App\Models\Order_info;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class OrderInfoController extends Controller
{
    public function index()
    {
        $orderInfo = Order_info::all();
        return response()->json($orderInfo);
    }

    public function view(string $id){
        $orderInfo = Order_info::where('id', $id)->get();
        return response()->json($orderInfo);
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|string|max:255',
                'street' => 'required|string|max:255',
                'street_number' => 'required|string|max:255',
                'postal' => 'string|max:255',
                'country' => 'required|string|max:255',
                'reduction' => 'required|boolean',
            ]
        );

        $orderInfo = new Order_info();
        $orderInfo->name = $request->input('name');
        $orderInfo->street = $request->input('street');
        $orderInfo->street_number = $request->input('street_number');
        $orderInfo->postal = $request->input('postal');
        $orderInfo->country = $request->input('country');
        $orderInfo->reduction = $request->input('reduction');
        $orderInfo->created_at = new Date.now();

        $orderInfo->save();

        return response()->json([
            'message' => 'Order Info has been saved',
            'OrderInfo' => $orderInfo,
        ], 201);
    }

    public function update(Request $request, string $id){
        $request->validate([
            'name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'street_number' => 'required|string|max:255',
            'postal' => 'string|max:255',
            'country' => 'required|string|max:255',
            'reduction' => 'required|boolean',
        ]);

        $orderInfo = Order_info::find('id', $id);
        $orderInfo->update($request->all());
        return response()->json([
            'message' => 'Order Info updated',
            'OrderInfo' => $orderInfo,
        ]);
    }


}
