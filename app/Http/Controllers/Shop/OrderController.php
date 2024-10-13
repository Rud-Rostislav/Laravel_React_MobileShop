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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'comment' => 'nullable|string|max:500',
            'products_id' => 'required|json',
            'products_quantity' => 'required|json',
        ]);

        $productsId = json_decode($request->products_id, true);
        $productsQuantity = json_decode($request->products_quantity, true);

        $order = new Order();
        $order->name = $request->name;
        $order->email = $request->email;
        $order->phone = $request->phone;
        $order->comment = $request->comment ?? '';
        $order->products_id = json_encode($productsId);
        $order->products_quantity = json_encode($productsQuantity);

        $order->save();
        return redirect()->route('products.index');
    }

    public function destroy(Order $order)
    {
        $order->delete();
    }

    public function confirm(Order $order)
    {
        $order->confirmed = true;
        $order->save();
    }

    public function notConfirm(Order $order)
    {
        $order->confirmed = false;
        $order->save();
    }

    public function confirmed()
    {
        $products = Product::with('photos')->get();
        $orders = Order::where('confirmed', true)->get();
        return Inertia::render('Shop/Orders/Orders_Confirmed', [
            'orders' => $orders,
            'products' => $products
        ]);
    }
}
