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
        $products = Product::with('photos')->paginate(10);
        $allProducts = Product::with('photos')->get();

        return Inertia::render('Shop/Products/Index', [
            'products' => $products,
            'allProducts' => $allProducts,
            'basket' => session()->get('basket', []),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Shop/Products/Create');
    }

    public function show(Product $product): Response
    {
        $product->load('photos');
        return Inertia::render('Shop/Products/Show', [
            'product' => $product,
            'basket' => session()->get('basket', []),
        ]);
    }

    public function edit(Product $product): Response
    {
        $product->load('photos');
        return Inertia::render('Shop/Products/Edit', [
            'product' => $product,
        ]);
    }

    public function storeOrUpdate(Request $request, Product $product = null): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if (!$product) {
            $product = new Product();
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->quantity = $request->quantity;
        $product->save();

        $productFolder = 'product_photos/' . $product->id;

        if ($request->hasFile('photos')) {
            $existingPhotos = $product->photos->pluck('path')->toArray();

            foreach ($request->file('photos') as $index => $photo) {
                $fileName = 'photo_' . ($index + 1) . '.' . $photo->getClientOriginalExtension();
                $folderPath = 'photos/product_' . $product->id;

                if (!Storage::disk('public')->exists($folderPath)) {
                    Storage::disk('public')->makeDirectory($folderPath);
                }

                $path = $photo->storeAs($folderPath, $fileName, 'public');

                if (in_array($fileName, $existingPhotos)) {
                    Storage::delete('public/' . $path);
                    $existingPhoto = $product->photos()->where('path', 'like', '%' . $fileName)->first();
                    $existingPhoto->update(['path' => $path]);
                } else {
                    $product->photos()->create(['path' => $path]);
                }
            }
        }

        if ($request->has('deleted_photos')) {
            $deletedPhotos = $product->photos()->whereIn('id', $request->input('deleted_photos'))->get();
            foreach ($deletedPhotos as $deletedPhoto) {
                Storage::delete('public/' . $deletedPhoto->path);
                $deletedPhoto->delete();
            }
        }

        return redirect()->route('products.show', $product);
    }

    public function store(Request $request): RedirectResponse
    {
        return $this->storeOrUpdate($request);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        return $this->storeOrUpdate($request, $product);
    }

    public function destroy(Product $product): Application|Redirector|RedirectResponse|\Illuminate\Contracts\Foundation\Application
    {
        if ($photos = $product->photos()->get()) {
            foreach ($photos as $photo) {
                Storage::delete('public/' . $photo->path);
                $photo->delete();
            }
        }

        $folderPath = 'photos/product_' . $product->id;
        if (Storage::disk('public')->exists($folderPath) && !Storage::disk('public')->allFiles($folderPath)) {
            Storage::disk('public')->deleteDirectory($folderPath);
        }

        $product->delete();
        return redirect(route('products.index'));
    }
}
