<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function confirm(Order $order)
    {
        $order->confirmed = true;
        $order->save();
        return redirect()->route('order.confirmed');
    }

    public function notConfirm(Order $order)
    {
        $order->confirmed = false;
        $order->save();
        return redirect()->route('dashboard');
    }

    public function confirmed()
    {
        $products = Product::with('photos')->get();
        $orders = Order::all();
        return Inertia::render('Profile/Orders/Confirmed', [
            'orders' => $orders,
            'products' => $products
        ]);
    }
}
