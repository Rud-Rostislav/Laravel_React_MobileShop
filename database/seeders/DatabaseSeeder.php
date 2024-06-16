<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => '1',
            'is_admin' => true
        ]);

        Product::factory()->create([
            'name' => 'iPhone 15 Pro max',
            'description' => 'Description of the product iPhone 15 Pro max',
            'price' => 63999,
            'quantity' => 70
        ]);

        Product::factory()->create([
            'name' => 'iPhone 14 Pro max',
            'description' => 'Description of the product iPhone 14 Pro max',
            'price' => 53999,
            'quantity' => 20
        ]);

        Product::factory()->create([
            'name' => 'iPhone 12 Pro max',
            'description' => 'Description of the product iPhone 12 Pro max',
            'price' => 32999,
            'quantity' => 32
        ]);

        Product::factory()->create([
            'name' => 'iPhone 11 Pro max',
            'description' => 'Description of the product iPhone 11 Pro max',
            'price' => 31999,
            'quantity' => 10
        ]);

        Product::factory()->create([
            'name' => 'iPhone 10',
            'description' => 'Description of the product iPhone 10',
            'price' => 29999,
            'quantity' => 5
        ]);

        Product::factory()->create([
            'name' => 'iPhone 8',
            'description' => 'Description of the product iPhone 8',
            'price' => 16999,
            'quantity' => 45
        ]);

        Product::factory()->create([
            'name' => 'iPhone 7',
            'description' => 'Description of the product iPhone 7',
            'price' => 14999,
            'quantity' => 6
        ]);

        Product::factory()->create([
            'name' => 'iPhone 6',
            'description' => 'Description of the product iPhone 6',
            'price' => 9999,
            'quantity' => 17
        ]);

        Product::factory()->create([
            'name' => 'AirPods',
            'description' => 'Description of the product AirPods',
            'price' => 1999,
            'quantity' => 32
        ]);
    }
}
