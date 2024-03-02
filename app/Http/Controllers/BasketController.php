<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BasketController extends Controller
{
    public function showBasket()
    {
        return Inertia::render('Basket', [
            'basket' => session()->get('basket', [])
        ]);
    }

    public function addToBasket(Request $request, Product $product)
    {
        // Logic to add the product to the basket using session storage
        $basket = session()->get('basket', []);
        $basket[] = $product->toArray(); // Convert the product object to an array
        session()->put('basket', $basket);
    }

    public function clearBasket()
    {
        // Clear the basket session data
        Session::forget('basket');
    }
}
