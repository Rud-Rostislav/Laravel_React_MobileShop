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

    public function addToBasket(Product $product)
    {
        $basket = session()->get('basket', []);
        $basket[] = $product->toArray();
        session()->put('basket', $basket);
    }

    public function clearBasket()
    {
        Session::forget('basket');
    }
}
