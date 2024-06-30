<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Shop\BasketController;
use App\Http\Controllers\Shop\OrderController;
use App\Http\Controllers\Shop\ProductController;
use App\Http\Controllers\Manager\ProjectController;
use App\Http\Controllers\Manager\TaskController;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/products');

Route::get('/dashboard', function () {
    $products = Product::with('photos')->get();
    $orders = Order::all();
    return Inertia::render('Shop/Orders/Dashboard', [
        'orders' => $orders,
        'products' => $products
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('/products', ProductController::class)->except('index', 'show')->middleware('auth');
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::get('/basket', [BasketController::class, 'showBasket'])->name('basket');
Route::post('/clear-basket', [BasketController::class, 'clearBasket'])->name('clear-basket');
Route::post('/add-to-basket/{product}', [BasketController::class, 'addToBasket'])->name('add-to-basket');

Route::post('/order', [OrderController::class, 'store'])->name('order.store');
Route::group(['middleware' => 'auth'], function () {
    Route::delete('/order/{order}', [OrderController::class, 'destroy'])->name('order.destroy');
    Route::get('/order/confirmed', [OrderController::class, 'confirmed'])->name('order.confirmed');
    Route::patch('/order/not-confirmed/{order}', [OrderController::class, 'notConfirm'])->name('order.notConfirm');
    Route::patch('/order/{order}', [OrderController::class, 'confirm'])->name('order.confirm');
});

Route::resource('/projects', ProjectController::class)->except('create', 'show', 'edit');
Route::resource('/tasks', TaskController::class)->except('index', 'create', 'show', 'edit');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(function () {
    return redirect()->route('products.index');
});

require __DIR__ . '/auth.php';
