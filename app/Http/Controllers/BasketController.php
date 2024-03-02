<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class BasketController extends Controller
{
    public function showBasket()
    {
        return Inertia::render('Basket', [
            'basket' => session()->get('basket', [])
        ]);
    }

    public function addToBasket(Product $product)
    {
        // Load the 'photos' relationship
        $product->load('photos');

        $basket = session()->get('basket', []);
        // Include photos in the basket item
        $basket[] = [
            'product' => $product->toArray(),
            'photos' => $product->photos->toArray(), // Access the loaded photos
        ];
        session()->put('basket', $basket);
    }

    public function clearBasket()
    {
        Session::forget('basket');
    }
}
