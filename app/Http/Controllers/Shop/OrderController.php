<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'comment' => 'nullable',
            'products_id' => 'required',
        ]);

        $order = new Order();
        $order->name = $request->name;
        $order->email = $request->email;
        $order->phone = $request->phone;
        $order->comment = $request->comment ?? '';
        $order->products_id = $request->products_id;
        $order->save();

        return redirect()->route('products.index');
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->route('dashboard');
    }
}
