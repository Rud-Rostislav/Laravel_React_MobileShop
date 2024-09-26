<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class BasketController extends Controller
{
    public function showBasket()
    {
        return Inertia::render('Shop/Basket/Index', [
            'basket' => session()->get('basket', [])
        ]);
    }

    public function addToBasket(Product $product)
    {
        $product->load('photos');

        $basket = session()->get('basket', []);
        $basket[] = [
            'product' => $product->toArray(),
            'photos' => $product->photos->toArray()
        ];
        session()->put('basket', $basket);
    }

    public function clearBasket()
    {
        Session::forget('basket');
    }

    public function removeFromBasket(Product $product)
    {
        $basket = session()->get('basket', []);
        $basket = array_filter($basket, function ($item) use ($product) {
            return isset($item['product']['id']) && $item['product']['id'] !== $product->id;
        });
        session()->put('basket', array_values($basket));
    }
}
