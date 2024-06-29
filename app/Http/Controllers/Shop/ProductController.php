<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::with('photos')->get();
        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->quantity = $request->quantity;
        $product->save();

        $productFolder = 'product_photos/' . $product->id;

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $index => $photo) {
                $path = $photo->storeAs($productFolder, 'product_' . $product->id . '_photo_' . ($index + 1) . '.' . $photo->getClientOriginalExtension(), 'public');
                $product->photos()->create(['path' => $path]);
            }
        }

        return redirect()->route('products.index');
    }

    public function show(Product $product): Response
    {
        $product->load('photos');
        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product): Response
    {
        $product->load('photos');
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->quantity = $request->quantity;

        $product->save();

        if ($request->has('deleted_photos')) {
            $deletedPhotos = $product->photos()->whereIn('id', $request->input('deleted_photos'))->get();
            foreach ($deletedPhotos as $deletedPhoto) {
                Storage::delete('public/' . $deletedPhoto->path);
                $deletedPhoto->delete();
            }
        }

        if ($request->hasFile('photos')) {
            $existingPhotos = $product->photos->pluck('path')->toArray();

            foreach ($request->file('photos') as $index => $photo) {
                $fileName = 'product_' . $product->id . '_photo_' . ($index + 1) . '.' . $photo->getClientOriginalExtension();
                $path = $photo->storeAs('product_photos', $fileName, 'public');

                if (in_array($fileName, $existingPhotos)) {
                    Storage::delete('public/product_photos/' . $fileName);
                    $existingPhoto = $product->photos()->where('path', 'like', '%' . $fileName)->first();
                    $existingPhoto->update(['path' => $path]);
                } else {
                    $product->photos()->create(['path' => $path]);
                }
            }
        }

        return redirect()->route('products.show', $product);
    }

    public function destroy(Product $product): Application|Redirector|RedirectResponse|\Illuminate\Contracts\Foundation\Application
    {
        if ($photos = $product->photos()->get()) {
            foreach ($photos as $photo) {
                Storage::delete('public/' . $photo->path);
            }
        }

        $product->delete();
        return redirect(route('products.index'));
    }
}
